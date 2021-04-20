# Labor availability raster layers
Layers for men and women in Lao and Vietnam

-  Run the process

```
./index.sh
```

-  Outputs in s3

```
aws s3 cp data/la-men_2019-06-01_cog_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/lao_men_2019-06-01_geotiff/
aws s3 cp data/la-women_2019-06-01_cog_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/lao_women_2019-06-01_geotiff/
aws s3 cp data/vn-men_2019-06-01_cog_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/vnm_men_2019-06-01_geotiff/
aws s3 cp data/vn-women_2019-06-01_cog_styled_rgba_compress.tif s3://cccmc-rubber-risk/data/population/vnm_women_2019-06-01_geotiff/
```

- Outputs sourceId in Mapbox

```
cccmc.labor_men_la
cccmc.labor_women_la
cccmc.labor_men_vn
cccmc.labor_women_vn
```
