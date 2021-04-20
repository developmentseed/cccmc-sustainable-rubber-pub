#!/bin/zsh
# set -e

export AWS_PROFILE=devseed
mkdir -p data/
mkdir -p admin_data/

function stats() {
    adminFile=$1
    raster_file=$2
    field=$3
    categorical=$4
    multiply_value=$5
    echo "========================> Adding field =>$field into =>$adminFile from =>$raster_file"
    # Get stats from the raster
    docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc-data-prep \
        python scripts/raster_stats.py \
        --input_boundary=$adminFile \
        --raster_file=$raster_file \
        --field=$field \
        --output_boundary=$adminFile \
        --categorical=$categorical \
        --multiply_value=$multiply_value
}

function sumUp() {
    childAdmin=$1
    childParent=$2
    field=$3
    echo "========================> Sum up values from child $childAdmin into parent $childParent"
    docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc-data-prep \
        python scripts/vector_sum_values.py $childAdmin $childParent $field
}

##############################################
#### Start looping the countries
##############################################
countries=(la mm vn)         #la 
adminlevels=(adm2 adm1 adm0) #adm3

for country in "${countries[@]}"; do
    for adminlevel in "${adminlevels[@]}"; do

        # Download admin layers
        adminFile=data/$country-$adminlevel.geojson
        [ ! -f $adminFile ] && aws s3 cp s3://cccmc-rubber-risk/dashboard/$country-$adminlevel.geojson $adminFile

        if [ "$adminlevel" = "adm2" ]; then
            childAdmin=$adminFile

            ###################################################
            # Landslide for ADMIN2
            ###################################################
            raster_file=data/suscV1_1-cog.tif
            [ ! -f $raster_file ] && aws s3 cp s3://cccmc-rubber-risk/data/hazards/global-landslide-susceptibility-map-1-30-20/suscV1_1-cog.tif data/
            stats $adminFile $raster_file "landslide_risk" True 1

            # ###################################################
            # # landuse for ADMIN2
            # ###################################################
            raster_file=data/Discrete-Classification-map_EPSG-4326_cog_${country}_fixed_style.tif
            [ ! -f $raster_file ] && aws s3 cp s3://cccmc-rubber-risk/data/landcov/Discrete-Classification-map_EPSG-4326_cog_${country}_fixed_style.tif data/
            stats $adminFile $raster_file "landuse" True 0.0121

            ###################################################
            # forest_loss for ADMIN2
            ###################################################
            raster_file=data/forest_loss_${country}_styled.tif
            [ ! -f $raster_file ] && aws s3 cp s3://cccmc-rubber-risk/data/Hansen_GFC-2019-forestloss/forest_loss_${country}_styled.tif data/
            stats $adminFile $raster_file "forest_loss" True 0.0008

            ###################################################
            # rubber 2020 for ADMIN2
            ###################################################
            raster_file=data/rubber_plantations_2020_${country}_reproject.tif
            [ ! -f $raster_file ] && aws s3 cp s3://cccmc-rubber-risk/inference/rubber_plantations_2020_${country}_reproject.tif data/
            stats $adminFile $raster_file "rubber_2020" True 0.0001 

            ###################################################
            # market_accesibility for ADMIN2
            ###################################################
            raster_file=data/market_accessibility_${country}_styled.tif
            [ ! -f $raster_file ] && aws s3 cp s3://cccmc-rubber-risk/data/access/market_accessibility_${country}_styled.tif data/
            stats $adminFile $raster_file "market_acc" True 1

        else
            #### Sum up values
            sumUp $childAdmin $adminFile "landslide_risk"
            sumUp $childAdmin $adminFile "landuse"
            sumUp $childAdmin $adminFile "forest_loss"
            sumUp $childAdmin $adminFile "rubber_2020"
            sumUp $childAdmin $adminFile "market_acc"

        fi
        # Geojson properties to CSV, in order to upload to github
        echo "$adminFile -> admin_data/${country}-${adminlevel}.csv"
        docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt cccmc-data-prep \
            python scripts/geojson2csv.py $adminFile admin_data/${country}-${adminlevel}.csv
            
        ##### Upload to s3
        echo "$adminFile Upload data to s3"
        aws s3 cp $adminFile s3://cccmc-rubber-risk/dashboard/
    done
done
