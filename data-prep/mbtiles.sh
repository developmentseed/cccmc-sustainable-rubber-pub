# !/usr/bin/env bash

export AWS_PROFILE=devseed
mkdir -p data/

geokit="docker run -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/mnt/data developmentseed/geokit:latest"
cccmc="docker run -u $(id -u ${USER}):$(id -g ${USER}) -t -v ${PWD}:/mnt cccmc-data-prep"


######## Admin boundaries : polygons
countries=(la mm vn)
adms=(adm0 adm1 adm2)
for country in "${countries[@]}"; do
    for adm in "${adms[@]}"; do
        echo ========================${country}-${adm}=====================================
        aws s3 cp s3://cccmc-rubber-risk/data/admin/${country}-${adm}.geojson data/${country}-${adm}_origin.geojson
        
        $cccmc python scripts/merge_csvgeojson.py data/${country}-${adm}_origin.geojson admin_data/${country}-${adm}.csv data/${country}-${adm}_csv.geojson
    done
done

######### Flood risk : polygons
aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/coastal_flood_risk_LAO.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/coastal_flood_risk_MMR.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/coastal_flood_risk_VNM.geojson data/

######### Riverine flood risk : polygons
aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/riverine_flood_risk_LAO.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/riverine_flood_risk_MMR.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/flood_risk/riverine_flood_risk_VNM.geojson data/

######### Drought  risk : polygons
aws s3 cp s3://cccmc-rubber-risk/data/drought/drought_risk_LAO.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/drought/drought_risk_MMR.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/drought/drought_risk_VNM.geojson data/

######### Tiger conservation landscapes : polygons
aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/tiger_conservation_landscapes/tiger_conservation_landscapes_LAO.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/tiger_conservation_landscapes/tiger_conservation_landscapes_MMR.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/tiger_conservation_landscapes/tiger_conservation_landscapes_VNM.geojson data/

######### Protected areas : polygons
aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/protected_areas/WDPA_WDOECM_Feb2021_protected_areas_LAO.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/protected_areas/WDPA_WDOECM_Feb2021_protected_areas_MMR.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/biodiversity/protected_areas/WDPA_WDOECM_Feb2021_protected_areas_VNM.geojson data/

######### Agepop 2010 : polygons
aws s3 cp s3://cccmc-rubber-risk/data/population/gpw-stats/gpw_to_geojson/la-adm2-agepop_2010_stat.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/population/gpw-stats/gpw_to_geojson/mm-adm2-agepop_2010_stat.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/population/gpw-stats/gpw_to_geojson/vn-adm2-agepop_2010_stat.geojson data/

######### Social risk : polygons
aws s3 cp s3://cccmc-rubber-risk/data/acled/la-adm2-social_risk_total.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/acled/mm-adm2-social_risk_total.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/acled/vn-adm2-social_risk_total.geojson data/

######### Tropical storms : polygons
aws s3 cp s3://cccmc-rubber-risk/data/tropical_storm/la-adm2-tropical_storm_total.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/tropical_storm/mm-adm2-tropical_storm_total.geojson data/
aws s3 cp s3://cccmc-rubber-risk/data/tropical_storm/vn-adm2-tropical_storm_total.geojson data/

$geokit \
    tippecanoe -Z0 -z6 --force -o data/cccmc_admins.mbtiles \
    \
    \
    -L'{"layer": "country_la", "file": "data/la-adm0_csv.geojson"}' \
    -L'{"layer": "country_mm", "file": "data/mm-adm0_csv.geojson"}' \
    -L'{"layer": "country_vn", "file": "data/vn-adm0_csv.geojson"}' \
    \
    \
    -L'{"layer": "province_la", "file": "data/la-adm1_csv.geojson"}' \
    -L'{"layer": "province_mm", "file": "data/mm-adm1_csv.geojson"}' \
    -L'{"layer": "province_vn", "file": "data/vn-adm1_csv.geojson"}' \
    \
    \
    -L'{"layer": "county_la", "file": "data/la-adm2_csv.geojson"}' \
    -L'{"layer": "county_mm", "file": "data/mm-adm2_csv.geojson"}' \
    -L'{"layer": "county_vn", "file": "data/vn-adm2_csv.geojson"}' \
    \
    \
    -L'{"layer": "coastal_flood_risk_la", "file": "data/coastal_flood_risk_LAO.geojson"}' \
    -L'{"layer": "coastal_flood_risk_mm", "file": "data/coastal_flood_risk_MMR.geojson"}' \
    -L'{"layer": "coastal_flood_risk_vn", "file": "data/coastal_flood_risk_VNM.geojson"}' \
    \
    \
    -L'{"layer": "riverine_flood_risk_la", "file": "data/riverine_flood_risk_LAO.geojson"}' \
    -L'{"layer": "riverine_flood_risk_mm", "file": "data/riverine_flood_risk_MMR.geojson"}' \
    -L'{"layer": "riverine_flood_risk_vn", "file": "data/riverine_flood_risk_VNM.geojson"}' \
    \
    \
    -L'{"layer": "drought_risk_la", "file": "data/drought_risk_LAO.geojson"}' \
    -L'{"layer": "drought_risk_mm", "file": "data/drought_risk_MMR.geojson"}' \
    -L'{"layer": "drought_risk_vn", "file": "data/drought_risk_VNM.geojson"}' \
    \
    \
    -L'{"layer": "tiger_conservation_landscapes_la", "file": "data/tiger_conservation_landscapes_LAO.geojson"}' \
    -L'{"layer": "tiger_conservation_landscapes_mm", "file": "data/tiger_conservation_landscapes_MMR.geojson"}' \
    -L'{"layer": "tiger_conservation_landscapes_vn", "file": "data/tiger_conservation_landscapes_VNM.geojson"}' \
    \
    \
    -L'{"layer": "protected_areas_la", "file": "data/WDPA_WDOECM_Feb2021_protected_areas_LAO.geojson"}' \
    -L'{"layer": "protected_areas_mm", "file": "data/WDPA_WDOECM_Feb2021_protected_areas_MMR.geojson"}' \
    -L'{"layer": "protected_areas_vn", "file": "data/WDPA_WDOECM_Feb2021_protected_areas_VNM.geojson"}' \
    \
    \
    -L'{"layer": "agepop_2010_stat_la", "file": "data/la-adm2-agepop_2010_stat.geojson"}' \
    -L'{"layer": "agepop_2010_stat_mm", "file": "data/mm-adm2-agepop_2010_stat.geojson"}' \
    -L'{"layer": "agepop_2010_stat_vn", "file": "data/vn-adm2-agepop_2010_stat.geojson"}' \
    \
    \
    -L'{"layer": "social_risk_total_la", "file": "data/la-adm2-social_risk_total.geojson"}' \
    -L'{"layer": "social_risk_total_mm", "file": "data/mm-adm2-social_risk_total.geojson"}' \
    -L'{"layer": "social_risk_total_vn", "file": "data/vn-adm2-social_risk_total.geojson"}' \
    \
    \
    -L'{"layer": "tropical_storm_total_la", "file": "data/la-adm2-tropical_storm_total.geojson"}' \
    -L'{"layer": "tropical_storm_total_mm", "file": "data/mm-adm2-tropical_storm_total.geojson"}' \
    -L'{"layer": "tropical_storm_total_vn", "file": "data/vn-adm2-tropical_storm_total.geojson"}'            

docker run -e MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN -v ${PWD}:/mnt/data developmentseed/geokit:latest \
    mapbox upload cccmc.cccmc_admins data/cccmc_admins.mbtiles
