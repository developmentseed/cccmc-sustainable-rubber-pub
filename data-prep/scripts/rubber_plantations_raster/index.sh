# !/usr/bin/env bash

export AWS_PROFILE=devseed
mkdir -p data/pred/

cccmc="docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc-data-prep"

# ############################################################################
# # Download boundaries and convert from Geojson to Shapefile
# ############################################################################
[ ! -f data/la-adm0.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/admin/la-adm0.geojson data/
[ ! -f data/vn-adm0.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/admin/vn-adm0.geojson data/
[ ! -f data/mm-adm0.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/admin/mm-adm0.geojson data/
[ ! -f data/la-ADM0.shp ] && $cccmc ogr2ogr -f "ESRI Shapefile" data/la-ADM0.shp data/la-adm0.geojson
[ ! -f data/vn-ADM0.shp ] && $cccmc ogr2ogr -f "ESRI Shapefile" data/vn-ADM0.shp data/vn-adm0.geojson
[ ! -f data/mm-ADM0.shp ] && $cccmc ogr2ogr -f "ESRI Shapefile" data/mm-ADM0.shp data/mm-adm0.geojson

# ##########################################################################
# Download rubber prediction files and compose rubber rasters
###########################################################################
[ ! -f data/pred/2018_95thresh_cog.tif  ] && aws s3 cp s3://cccmc-rubber-risk/predictions/2018_95thresh_cog.tif data/pred/
[ ! -f data/pred/2019_95thresh_cog.tif  ] && aws s3 cp s3://cccmc-rubber-risk/predictions/2019_95thresh_cog.tif data/pred/
[ ! -f data/pred/2020_95thresh_cog.tif  ] && aws s3 cp s3://cccmc-rubber-risk/predictions/2020_95thresh_cog.tif data/pred/

$cccmc python rubber_plantations_raster_comps.py \
    --raster_inputs="data/pred/"
    --raster_output="data/final_merged_2020-255.tif"

# Upload Rubber compose file to s3
aws s3 cp data/final_merged_2020-255.tif.tif s3://cccmc-rubber-risk/predictions/

###########################################################################
# Download the merged rubber rasters
###########################################################################
[ ! -f data/final_merged_2020-255.tif  ] && aws s3 cp s3://cccmc-rubber-risk/predictions/final_merged_2020-255.tif data/

# Convert to COG - merged rubber rasters
[ ! -f data/final_merged_2020-255_cog.tif ] &&
docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    gdalbuildvrt data/final_merged_2020-255.vrt data/final_merged_2020-255.tif

docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    rio cogeo create data/final_merged_2020-255.vrt data/final_merged_2020-255_cog.tif \
    --blocksize 512 \
    --overview-blocksize 512 \
    --allow-intermediate-compression

# Upload COG file to s3 - merged rubber rasters cog
    aws s3 cp data/final_merged_2020-255_cog.tif s3://cccmc-rubber-risk/predictions/

countries=(la mm vn)
for country in "${countries[@]}"; do

    echo "Clip tif layer $country"
    [ ! -f data/rubber_plantations_2020_${country}.tif ] &&
        $cccmc gdalwarp -of GTiff \
            -co COMPRESS=DEFLATE \
            -cutline data/$country-ADM0.shp \
            -cl $country-ADM0 \
            -crop_to_cutline -dstnodata 0.0 \
            data/final_merged_2020-255_cog.tif \
            data/rubber_plantations_2020_${country}.tif

    echo "Styling tif layer $country"
        $cccmc python rubber_plantations_raster_styling.py \
             --raster_input=data/rubber_plantations_2020_${country}.tif 
 
    echo "Translate file in RGBA - $country"
    [ ! -f data/rubber_plantations_2020_${country}_rgba.tif ] &&
        $cccmc gdal_translate -expand rgba \
            -co COMPRESS=DEFLATE \
            data/rubber_plantations_2020_${country}.tif \
            data/rubber_plantations_2020_${country}_rgba.tif

    echo "Compress the file - $country"
    [ ! -f data/rubber_plantations_2020_${country}_rgba_compress.tif ] &&
        $cccmc gdal_translate -of GTiff \
            -co COMPRESS=DEFLATE \
            -co COMPRESS=LZW -co PREDICTOR=2 \
            -co TILED=YES data/rubber_plantations_2020_${country}_rgba.tif \
            data/rubber_plantations_2020_${country}_rgba_compress.tif
  
    # Upload to s3
    aws s3 cp data/rubber_plantations_2020_${country}.tif s3://cccmc-rubber-risk/predictions/
    aws s3 cp data/rubber_plantations_2020_${country}_rgba_compress.tif s3://cccmc-rubber-risk/predictions/

    # Upload to mapbox
    docker run \
        -e MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN \
        -v ${PWD}:/mnt/data developmentseed/geokit:latest \
        mapbox upload cccmc.rubber_plantations_2020_${country} data/rubber_plantations_2020_${country}_rgba_compress.tif

done

