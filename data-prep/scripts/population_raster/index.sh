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
# Clip forest loss raster
###########################################################################

# Download tif layer from s3
[ ! -f data/lao_vnm_mmr-ppp_2020-cog.tif ] && aws s3 cp s3://cccmc-rubber-risk/data/population/worldpop/lao_vnm_mmr-ppp_2020-cog.tif data/

countries=(la mm vn)
for country in "${countries[@]}"; do

    echo "Clip tif layer" ${country}
    $cccmc gdalwarp -of GTiff \
        -cutline data/${country}-ADM0.shp \
        -cl ${country}-ADM0 \
        -crop_to_cutline -dstnodata 0.0 \
        data/lao_vnm_mmr-ppp_2020-cog.tif \
        data/ppp_2020-${country}.tif

    echo "Styling tif layer" ${country}
    [ ! -f data/ppp_2020-${country}_styled.tif ] &&
        $cccmc python styling.py \
            --raster_input=data/ppp_2020-${country}.tif \
            --raster_output=data/ppp_2020-${country}_styled.tif

    echo "Translate file in RGBA" ${country}
    [ ! -f data/ppp_2020-${country}_styled_rgba.tif ] &&
        $cccmc gdal_translate -expand rgba \
            data/ppp_2020-${country}_styled.tif \
            data/ppp_2020-${country}_styled_rgba.tif

    echo "Compress the file" ${country}
    [ ! -f data/ppp_2020-${country}_styled_rgba_compress.tif ] &&
        $cccmc gdal_translate -of GTiff \
            -co COMPRESS=LZW -co PREDICTOR=2 \
            -co TILED=YES data/ppp_2020-${country}_styled_rgba.tif \
            data/ppp_2020-${country}_styled_rgba_compress.tif

    echo "Upload to s3 ${country}"
    aws s3 cp data/ppp_2020-${country}_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/worldpop/

    echo "Upload to mapbox ${country}"
    docker run \
        -e MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN \
        -v ${PWD}:/mnt/data developmentseed/geokit:latest \
        mapbox upload cccmc.worldpop_${country} data/ppp_2020-${country}_styled_rgba_compress.tif
done
