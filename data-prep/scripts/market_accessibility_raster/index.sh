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
# Clip and styling market accessibility raster
###########################################################################

# Download tif layer from s3
[ ! -f data/2015_accessibility_to_cities_v1.0-cog.tif ] && aws s3 cp s3://cccmc-rubber-risk/data/access/2015_accessibility_to_cities_v1.0-cog.tif data/

countries=(la mm vn)
for country in "${countries[@]}"; do

    echo "Clip tif layer $country"
    [ ! -f data/market_accessibility_${country}.tif ] &&
        $cccmc gdalwarp -of GTiff \
            -cutline data/$country-ADM0.shp \
            -cl $country-ADM0 \
            -crop_to_cutline \
            data/2015_accessibility_to_cities_v1.0-cog.tif \
            data/market_accessibility_${country}.tif
        
    echo "Styling tif layer $country"
    [ ! -f data/market_accessibility_${country}_styled.tif ] &&
        $cccmc python market_accessibility_raster_styling.py \
            --raster_input=data/market_accessibility_$country.tif \
            --raster_output=data/market_accessibility_${country}_styled.tif
 
    echo "Translate file in RGBA - $country"
    [ ! -f data/market_accessibility_${country}_rgba.tif ] &&
        $cccmc gdal_translate -expand rgba \
            data/market_accessibility_${country}_styled.tif \
            data/market_accessibility_${country}_rgba.tif

    echo "Compress the file - $country"
    [ ! -f data/market_accessibility_${country}_rgba_compress.tif ] &&
        $cccmc gdal_translate -of GTiff \
            -co COMPRESS=LZW -co PREDICTOR=2 \
            -co TILED=YES data/market_accessibility_${country}_rgba.tif \
            data/market_accessibility_${country}_rgba_compress.tif
  
    # Upload to s3 
    aws s3 cp data/market_accessibility_${country}_rgba_compress.tif s3://cccmc-rubber-risk/data/access/

    # Upload to mapbox
    docker run \
        -e MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN \
        -v ${PWD}:/mnt/data developmentseed/geokit:latest \
        mapbox upload cccmc.market_accessibility_${country} data/market_accessibility_${country}_rgba_compress.tif

done

