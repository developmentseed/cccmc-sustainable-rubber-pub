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

###########################################################################
# Clip and styling forest loss raster
###########################################################################

# Download tif layer from s3
[ ! -f data/Hansen_GFC-2019_mosaic_cog.tif ] && aws s3 cp s3://cccmc-rubber-risk/data/Hansen_GFC-2019-forestloss/Hansen_GFC-2019_mosaic_cog.tif data/

countries=(la mm vn)
for country in "${countries[@]}"; do

    echo "Clip tif layer $country"
    [ ! -f data/forest_loss_$country.tif ] &&
        $cccmc gdalwarp -of GTiff \
            -co COMPRESS=DEFLATE \
            -cutline data/$country-ADM0.shp \
            -cl $country-ADM0 \
            -crop_to_cutline -dstnodata 0.0 \
            data/Hansen_GFC-2019_mosaic_cog.tif \
            data/forest_loss_$country.tif

    echo "Styling tif layer $country"
    [ ! -f data/forest_loss_${country}_styled.tif ] &&
        $cccmc python forest_loss_raster_styling.py \
            --raster_input=data/forest_loss_${country}.tif \
            --raster_output=data/forest_loss_${country}_styled.tif

    echo "Translate file in RGBA - $country"
    [ ! -f data/forest_loss_${country}_rgba.tif ] &&
        $cccmc gdal_translate -expand rgba \
            -co COMPRESS=DEFLATE \
            data/forest_loss_${country}_styled.tif \
            data/forest_loss_${country}_rgba.tif

    echo "Compress the file - $country"
    [ ! -f data/forest_loss_${country}_rgba_compress.tif ] &&
        $cccmc gdal_translate -of GTiff \
            -co COMPRESS=DEFLATE \
            -co COMPRESS=LZW -co PREDICTOR=2 \
            -co TILED=YES data/forest_loss_${country}_rgba.tif \
            data/forest_loss_${country}_rgba_compress.tif
  
    # Upload to s3
    aws s3 cp data/forest_loss_${country}.tif s3://cccmc-rubber-risk/data/Hansen_GFC-2019-forestloss/    
    aws s3 cp data/forest_loss_${country}_styled.tif s3://cccmc-rubber-risk/data/Hansen_GFC-2019-forestloss/    
    aws s3 cp data/forest_loss_${country}_rgba_compress.tif s3://cccmc-rubber-risk/data/Hansen_GFC-2019-forestloss/

    # Upload to mapbox
    docker run \
        -e MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN \
        -v ${PWD}:/mnt/data developmentseed/geokit:latest \
        mapbox upload cccmc.forest_loss_${country} data/forest_loss_${country}_rgba_compress.tif
done

