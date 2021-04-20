# !/usr/bin/env bash

export AWS_PROFILE=devseed
mkdir -p data/
# mkdir -p admin_data/
cccmc="docker run -u $(id -u ${USER}):$(id -g ${USER}) -t -v ${PWD}:/mnt cccmc-data-prep"

############################################################################
# Download Data
############################################################################

# Social risk
[ ! -f data/Southeast-Asia_2010-2020_Nov28_AOI.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/acled/Southeast-Asia_2010-2020_Nov28_AOI.geojson data/

# Tropical storm tracks
[ ! -f data/tropical_storm_tracks_1956_2018dec31_AOI.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/tropical_storm/tropical_storm_tracks_1956_2018dec31_AOI.geojson  data/ 

# Tiger conservation landscapes
[ ! -f data/tiger_conservation_landscapes_la.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/tiger_conservation_landscapes/tiger_conservation_landscapes_LAO.geojson data/tiger_conservation_landscapes_la.geojson
[ ! -f data/tiger_conservation_landscapes_mm.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/tiger_conservation_landscapes/tiger_conservation_landscapes_MMR.geojson data/tiger_conservation_landscapes_mm.geojson
[ ! -f data/tiger_conservation_landscapes_vn.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/tiger_conservation_landscapes/tiger_conservation_landscapes_VNM.geojson data/tiger_conservation_landscapes_vn.geojson

# protected areas 
[ ! -f data/WDPA_WDOECM_Feb2021_protected_areas_la.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/protected_areas/WDPA_WDOECM_Feb2021_protected_areas_LAO.geojson data/WDPA_WDOECM_Feb2021_protected_areas_la.geojson
[ ! -f data/WDPA_WDOECM_Feb2021_protected_areas_mm.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/protected_areas/WDPA_WDOECM_Feb2021_protected_areas_MMR.geojson data/WDPA_WDOECM_Feb2021_protected_areas_mm.geojson
[ ! -f data/WDPA_WDOECM_Feb2021_protected_areas_vn.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/protected_areas/WDPA_WDOECM_Feb2021_protected_areas_VNM.geojson data/WDPA_WDOECM_Feb2021_protected_areas_vn.geojson

# protected areas 
[ ! -f data/nasa_global_landslide.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/nasa_global_landslide.geojson data/

# Drought  risk : polygons
[ ! -f data/drought_risk_la.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/drought/drought_risk_LAO.geojson data/drought_risk_la.geojson
[ ! -f data/drought_risk_mm.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/drought/drought_risk_MMR.geojson data/drought_risk_mm.geojson
[ ! -f data/drought_risk_vn.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/drought/drought_risk_VNM.geojson data/drought_risk_vn.geojson

# Flood risk - coastal
[ ! -f data/coastal_flood_risk_la.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/coastal_flood_risk_LAO.geojson data/coastal_flood_risk_la.geojson
[ ! -f data/coastal_flood_risk_mm.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/coastal_flood_risk_MMR.geojson data/coastal_flood_risk_mm.geojson
[ ! -f data/coastal_flood_risk_vn.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/coastal_flood_risk_VNM.geojson data/coastal_flood_risk_vn.geojson

# Flood risk - riverine
[ ! -f data/riverine_flood_risk_la.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/riverine_flood_risk_LAO.geojson data/riverine_flood_risk_la.geojson
[ ! -f data/riverine_flood_risk_mm.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/riverine_flood_risk_MMR.geojson data/riverine_flood_risk_mm.geojson
[ ! -f data/riverine_flood_risk_vn.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/riverine_flood_risk_VNM.geojson data/riverine_flood_risk_vn.geojson

# gpw population stats
[ ! -f data/gpw_population_estimates_la.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/population/gpw-stats/gpw_to_geojson/gpw_v4_admin_unit_center_points_population_estimates_rev11_la.geojson data/gpw_population_estimates_la.geojson
[ ! -f data/gpw_population_estimates_mm.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/population/gpw-stats/gpw_to_geojson/gpw_v4_admin_unit_center_points_population_estimates_rev11_mm.geojson data/gpw_population_estimates_mm.geojson
[ ! -f data/gpw_population_estimates_vn.geojson ] && aws s3 cp s3://cccmc-rubber-risk/data/population/gpw-stats/gpw_to_geojson/gpw_v4_admin_unit_center_points_population_estimates_rev11_vn.geojson data/gpw_population_estimates_vn.geojson

# ############################################################################
# Pre processing  Tropical storm tracks : Line
# Convert line to points, distance 5 km, create id_tmp
# ############################################################################

$cccmc python scripts/line_point.py \
    --input_line=data/tropical_storm_tracks_1956_2018dec31_AOI.geojson \
    --distance=5  \
    --output_points=data/tropical_storm_tracks_1956_2018dec31_AOI_POINTS.geojson


############################################################################
# Processing  data
############################################################################

countries=(la mm vn)
adms=(adm0 adm1 adm2)
for country in "${countries[@]}"; do
    for adm in "${adms[@]}"; do
        echo ========================${country}-${adm}=====================================
        aws s3 cp s3://cccmc-rubber-risk/dashboard/${country}-${adm}.geojson data/

############################################################################
# Processing  Corruption Index ,
############################################################################
        $cccmc python scripts/fields_no_geo.py \
            --input_boundary=data/${country}-${adm}.geojson \
            --output_boundary=data/fields_${country}-${adm}.geojson

# ###########################################################################
# Processing  Social risk : points
# ###########################################################################

        $cccmc python scripts/points_polygon.py \
            --input_boundary=data/fields_${country}-${adm}.geojson \
            --input_points=data/Southeast-Asia_2010-2020_Nov28_AOI.geojson  \
            --properties_string=YEAR   \
            --properties_string=EVENT_TYPE   \
            --prefix=social_risk \
            --output_boundary=data/social_risk_${country}-${adm}.geojson

############################################################################
# Processing  Tropical storm tracks : remove duplicates
############################################################################

        $cccmc python scripts/points_no_duplicates.py \
            --input_points data/tropical_storm_tracks_1956_2018dec31_AOI_POINTS.geojson \
            --input_boundary data/${country}-${adm}.geojson   \
            --filter_tag id_tmp \
            --output_points data/tropical_storm_points_${country}-${adm}.geojson

    # Processing  Tropical storm tracks : points into polygon

        $cccmc python scripts/points_polygon.py \
            --input_boundary=data/social_risk_${country}-${adm}.geojson \
            --input_points=data/tropical_storm_points_${country}-${adm}.geojson \
            --properties_string=ADV_DATE   \
            --properties_string=SPEED   \
            --prefix=tropical_storm \
            --properties_mix=ADV_DATE__SPEED  \
            --output_boundary=data/tropical_storm_${country}-${adm}.geojson

############################################################################
# Processing tiger conservation landscapes: polygons
############################################################################

        $cccmc python scripts/area_intersection.py \
            --input_boundary=data/tropical_storm_${country}-${adm}.geojson \
            --input_polygons=data/tiger_conservation_landscapes_${country}.geojson \
            --area_label=tiger_conservation_area   \
            --output_boundary=data/tiger_conservation_${country}-${adm}.geojson

############################################################################
# Processing protected areas : polygons
############################################################################

        $cccmc python scripts/area_intersection.py \
            --input_boundary=data/tiger_conservation_${country}-${adm}.geojson  \
            --input_polygons=data/WDPA_WDOECM_Feb2021_protected_areas_${country}.geojson \
            --area_label=protected_area   \
            --output_boundary=data/protected_areas_${country}-${adm}.geojson
############################################################################
# Processing Drought  risk : polygons
############################################################################

        $cccmc python scripts/area_intersection.py \
            --input_boundary=data/protected_areas_${country}-${adm}.geojson  \
            --input_polygons=data/drought_risk_${country}.geojson \
            --area_label=drought_risk   \
            --polygon_field=drr_cat   \
            --output_boundary=data/drought_risk_${country}-${adm}.geojson

############################################################################
# Processing Flood risk - coastal
############################################################################

        $cccmc python scripts/area_intersection.py \
            --input_boundary=data/drought_risk_${country}-${adm}.geojson  \
            --input_polygons=data/coastal_flood_risk_${country}.geojson \
            --area_label=coastal_flood_risk   \
            --polygon_field=cfr_cat   \
            --output_boundary=data/coastal_flood_risk_${country}-${adm}.geojson

############################################################################
# Processing Flood risk - riverine
############################################################################

        $cccmc python scripts/area_intersection.py \
            --input_boundary=data/coastal_flood_risk_${country}-${adm}.geojson  \
            --input_polygons=data/riverine_flood_risk_${country}.geojson \
            --area_label=riverine_flood_risk   \
            --polygon_field=rfr_cat   \
            --output_boundary=data/riverine_flood_risk_${country}-${adm}.geojson

############################################################################
# Processing pop by age from gpw-pop
############################################################################
    # Sum of the pop from 15 to 59
        $cccmc python scripts/sum_age_15_59.py \
            --file_path=data/gpw_population_estimates_${country}.geojson \
            --output_file=data/gpw_population_estimates_sum_${country}-${adm}.geojson

    # Sum population density of all point in a polygon

        $cccmc python scripts/sum_points_values.py \
            --admin_parent=data/riverine_flood_risk_${country}-${adm}.geojson  \
            --admin_child=data/gpw_population_estimates_sum_${country}-${adm}.geojson  \
            --output_boundary=data/gpw_population_estimates_${country}-${adm}.geojson

############################################################################
#  calculate stats
############################################################################
        $cccmc python scripts/vector_stats.py \
            --input_boundary=data/gpw_population_estimates_${country}-${adm}.geojson  \
            --output_boundary=data/stats_${country}-${adm}.geojson

############################################################################
# upload s3
###########################################################################
        mv data/stats_${country}-${adm}.geojson  data/${country}-${adm}.geojson
        aws s3 cp data/${country}-${adm}.geojson s3://cccmc-rubber-risk/dashboard/${country}-${adm}.geojson

###########################################################################
# Geojson properties to CSV, in order to upload to github
##########################################################################
        echo "data/${country}-${adm}.geojson -> admin_data/${country}-${adm}.csv"
        $cccmc python scripts/geojson2csv.py data/${country}-${adm}.geojson admin_data/${country}-${adm}.csv

    done
done


###########################################################################
# Geojson properties to CSV, in order to upload to github
##########################################################################
$cccmc  papermill  scripts/rubber_least_profitable_price/The_least_rubber_profitable_price.ipynb scripts/rubber_least_profitable_price/The_least_rubber_profitable_price_out.ipynb

for country in "${countries[@]}"; do
    for adm in "${adms[@]}"; do
        echo ======================= CLEAN === ${country}-${adm}.csv =====================================
###########################################################################
# clean csv
##########################################################################

         $cccmc python scripts/clean_csv.py --input_csv admin_data/${country}-${adm}.csv

    done
done