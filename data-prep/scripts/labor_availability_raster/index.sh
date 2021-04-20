# !/usr/bin/env bash

#export AWS_PROFILE=devseed
mkdir -p data/

cccmc="docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc-data-prep"

###########################################################################
# Styling the rasters
###########################################################################

## Download tif layer from s3

## Lao data
[ ! -f data/LAO_men_2019-06-01.tif ] && aws s3 cp s3://cccmc-rubber-risk/data/population/lao_men_2019-06-01_geotiff/LAO_men_2019-06-01.tif data/
[ ! -f data/LAO_women_2019-06-01_cog.tif ] && aws s3 cp s3://cccmc-rubber-risk/data/population/lao_women_2019-06-01_geotiff/LAO_women_2019-06-01.tif data/
## Vietnam daya
[ ! -f data/VNM_men_2019-06-01.tif ] && aws s3 cp s3://cccmc-rubber-risk/data/population/vnm_men_2019-06-01_geotiff/VNM_men_2019-06-01.tif data/
[ ! -f data/VNM_women_2019-06-01.tif ] && aws s3 cp s3://cccmc-rubber-risk/data/population/vnm_women_2019-06-01_geotiff/VNM_women_2019-06-01.tif data/

## LAO
# Convert to COG
docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    gdalbuildvrt data/lao_men_mosaic.vrt data/LAO_men_2019-06-01.tif

docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    rio cogeo create data/lao_men_mosaic.vrt data/la-men_2019-06-01_cog.tif \
    --blocksize 512 \
    --overview-blocksize 512 \
    --allow-intermediate-compression

docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    gdalbuildvrt data/lao_women_mosaic.vrt data/LAO_women_2019-06-01.tif

docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    rio cogeo create data/lao_women_mosaic.vrt data/la-women_2019-06-01_cog.tif \
    --blocksize 512 \
    --overview-blocksize 512 \
    --allow-intermediate-compression

# Styling tif layer - LAO 
$cccmc python labor_availability_raster_styling.py \
    --raster_input=data/la-men_2019-06-01_cog.tif \
    --raster_output=data/la-men_2019-06-01_cog_styled.tif

$cccmc python labor_availability_raster_styling.py \
    --raster_input=data/la-women_2019-06-01_cog.tif \
    --raster_output=data/la-women_2019-06-01_cog_styled.tif

# Translate file in RGBA - LAO
$cccmc gdal_translate -expand rgba \
    data/la-men_2019-06-01_cog_styled.tif \
    data/la-men_2019-06-01_cog_styled_rgba.tif

$cccmc gdal_translate -expand rgba \
    data/la-women_2019-06-01_cog_styled.tif \
    data/la-women_2019-06-01_cog_styled_rgba.tif

# Compress the file - LAO
$cccmc gdal_translate -of GTiff \
    -co COMPRESS=LZW -co PREDICTOR=2 \
    -co TILED=YES data/la-men_2019-06-01_cog_styled_rgba.tif \
    data/la-men_2019-06-01_cog_styled_rgba_compress.tif  

$cccmc gdal_translate -of GTiff \
    -co COMPRESS=LZW -co PREDICTOR=2 \
    -co TILED=YES data/la-women_2019-06-01_styled_rgba.tif \
    data/la-women_2019-06-01_cog_styled_rgba_compress.tif

# Upload to s3 - LAO
aws s3 cp data/la-men_2019-06-01_cog_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/lao_men_2019-06-01_geotiff/
aws s3 cp data/la-women_2019-06-01_cog_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/lao_women_2019-06-01_geotiff/

## VNM
# Convert to COG
docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    gdalbuildvrt data/vnm_men_mosaic.vrt data/VNM_men_2019-06-01.tif

docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    rio cogeo create data/vnm_men_mosaic.vrt data/vn-men_2019-06-01_cog.tif \
    --blocksize 512 \
    --overview-blocksize 512 \
    --allow-intermediate-compression

docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    gdalbuildvrt data/vnm_women_mosaic.vrt data/VNM_women_2019-06-01.tif

docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc/lambda-gdal \
    rio cogeo create data/vnm_women_mosaic.vrt data/vn-women_2019-06-01_cog.tif \
    --blocksize 512 \
    --overview-blocksize 512 \
    --allow-intermediate-compression

# Styling tif layer - VNM 
$cccmc python labor_availability_raster_styling.py \
    --raster_input=data/vn-men_2019-06-01_cog.tif \
    --raster_output=data/vn-men_2019-06-01_cog_styled.tif

$cccmc python labor_availability_raster_styling.py \
    --raster_input=data/vn-women_2019-06-01_cog.tif \
    --raster_output=data/vn-women_2019-06-01_cog_styled.tif

# Translate file in RGBA - VNM
$cccmc gdal_translate -expand rgba \
    data/vn-men_2019-06-01_cog_styled.tif \
    data/vn-men_2019-06-01_cog_styled_rgba.tif

$cccmc gdal_translate -expand rgba \
    data/vn-women_2019-06-01_cog_styled.tif \
    data/vn-women_2019-06-01_cog_styled_rgba.tif

# Compress the file - VNM
$cccmc gdal_translate -of GTiff \
    -co COMPRESS=LZW -co PREDICTOR=2 \
    -co TILED=YES data/vn-men_2019-06-01_cog_styled_rgba.tif \
    data/vn-men_2019-06-01_cog_styled_rgba_compress.tif  

$cccmc gdal_translate -of GTiff \
    -co COMPRESS=LZW -co PREDICTOR=2 \
    -co TILED=YES data/vn-women_2019-06-01_cog_styled_rgba.tif \
    data/vn-women_2019-06-01_cog_styled_rgba_compress.tif

# Upload to s3 - VNM
aws s3 cp data/vn-men_2019-06-01_cog_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/vnm_men_2019-06-01_geotiff/
aws s3 cp data/vn-women_2019-06-01_cog_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/vnm_women_2019-06-01_geotiff/

## Upload to Mapbox
mapbox upload cccmc.labor_men_la data/la-men_2019-06-01_cog_styled_rgba_compress.tif 
mapbox upload cccmc.labor_women_la data/la-women_2019-06-01_cog_styled_rgba_compress.tif
mapbox upload cccmc.labor_men_vn data/vn-men_2019-06-01_cog_styled_rgba_compress.tif
mapbox upload cccmc.labor_women_vn data/vn-women_2019-06-01_cog_styled_rgba_compress.tif