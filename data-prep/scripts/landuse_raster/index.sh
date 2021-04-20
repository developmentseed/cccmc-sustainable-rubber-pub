# !/usr/bin/env bash

export AWS_PROFILE=devseed
mkdir -p data/

cccmc="docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc-data-prep"

############################################################################
# Download boundaries and convert from Geojson to Shapefile
############################################################################
[ ! -f data/la-adm0.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/admin/la-adm0.geojson data/
[ ! -f data/vn-adm0.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/admin/vn-adm0.geojson data/
[ ! -f data/mm-adm0.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/admin/mm-adm0.geojson data/
[ ! -f data/la-ADM0.shp ] && $cccmc ogr2ogr -f "ESRI Shapefile" data/la-ADM0.shp data/la-adm0.geojson
[ ! -f data/vn-ADM0.shp ] && $cccmc ogr2ogr -f "ESRI Shapefile" data/vn-ADM0.shp data/vn-adm0.geojson
[ ! -f data/mm-ADM0.shp ] && $cccmc ogr2ogr -f "ESRI Shapefile" data/mm-ADM0.shp data/mm-adm0.geojson

############################################################################
# Clip the landcover raster
############################################################################

# Download tifs from s3
[ ! -f data/Discrete-Classification-map_EPSG-4326_cog.tif ] && aws s3 cp s3://cccmc-rubber-risk/data/landcov/Discrete-Classification-map_EPSG-4326_cog.tif data/

countries=(la mm vn)
for country in "${countries[@]}"; do

    echo "Clip tif layer $country"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_$country.tif ] &&
        $cccmc gdalwarp -of GTiff \
            -cutline data/$country-ADM0.shp \
            -cl $country-ADM0 \
            -crop_to_cutline -dstnodata 0.0 \
            data/Discrete-Classification-map_EPSG-4326_cog.tif \
            data/Discrete-Classification-map_EPSG-4326_cog_$country.tif

    echo "Styling tif layer $country"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_${country}_styled.tif ] &&
        $cccmc python landuse_raster_styling.py \
            --raster_input=data/Discrete-Classification-map_EPSG-4326_cog_$country.tif \
            --raster_output=data/Discrete-Classification-map_EPSG-4326_cog_${country}_styled.tif
    
    echo "Remove the white background for 4.0 value"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_${country}_4_0.tif ] &&
        $cccmc gdalwarp -of GTiff \
        -cutline data/$country-ADM0.shp \
        -cl $country-ADM0 \
        -crop_to_cutline -dstnodata 4.0 \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_styled.tif \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_4_0.tif
    
    echo "Remove the white background for 6.0 value"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_${country}_6_0.tif ] &&
        $cccmc gdalwarp -of GTiff \
        -cutline data/$country-ADM0.shp \
        -cl $country-ADM0 \
        -crop_to_cutline -dstnodata 6.0 \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_4_0.tif \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_6_0.tif

    echo "Remove the white background for 7.0 value"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_${country}_7_0.tif ] &&
        $cccmc gdalwarp -of GTiff \
        -cutline data/$country-ADM0.shp \
        -cl $country-ADM0 \
        -crop_to_cutline -dstnodata 7.0 \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_6_0.tif \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_7_0.tif

    echo "Remove the white background for 11.0 value"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_${country}_11_0.tif ] &&
        $cccmc gdalwarp -of GTiff \
        -cutline data/$country-ADM0.shp \
        -cl $country-ADM0 \
        -crop_to_cutline -dstnodata 11.0 \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_7_0.tif \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_11_0.tif   

    echo "Remove the white background for 0.0 value"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_${country}_0_0.tif ] &&
        $cccmc gdalwarp -of GTiff \
        -cutline data/$country-ADM0.shp \
        -cl $country-ADM0 \
        -crop_to_cutline -dstnodata 0.0 \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_11_0.tif \
        data/Discrete-Classification-map_EPSG-4326_cog_${country}_0_0.tif   

    # Remane file
    mv data/Discrete-Classification-map_EPSG-4326_cog_${country}_0_0.tif data/Discrete-Classification-map_EPSG-4326_cog_${country}_fixed_style.tif     

    echo "Translate file in RGBA - $country"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_${country}_rgba.tif ] &&
        $cccmc gdal_translate -expand rgba \
            data/Discrete-Classification-map_EPSG-4326_cog_${country}_fixed_style.tif \
            data/Discrete-Classification-map_EPSG-4326_cog_${country}_rgba.tif

    echo "Compress the file - $country"
    [ ! -f data/Discrete-Classification-map_EPSG-4326_cog_${country}_rgba_compress.tif ] &&
        $cccmc gdal_translate -of GTiff \
            -co COMPRESS=LZW -co PREDICTOR=2 \
            -co TILED=YES data/Discrete-Classification-map_EPSG-4326_cog_${country}_rgba.tif \
            data/Discrete-Classification-map_EPSG-4326_cog_${country}_rgba_compress.tif

    # Upload to s3
    aws s3 cp data/Discrete-Classification-map_EPSG-4326_cog_$country.tif s3://cccmc-rubber-risk/data/landcov/
    aws s3 cp data/Discrete-Classification-map_EPSG-4326_cog_${country}_fixed_style.tif s3://cccmc-rubber-risk/data/landcov/
    aws s3 cp data/Discrete-Classification-map_EPSG-4326_cog_${country}_rgba_compress.tif s3://cccmc-rubber-risk/data/landcov/

    echo "Upload to mapbox ${country}"
        docker run \
            -e MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN \
            -v ${PWD}:/mnt/data developmentseed/geokit:latest \
            mapbox upload cccmc.landuse_${country} data/Discrete-Classification-map_EPSG-4326_cog_${country}_rgba_compress.tif
done
