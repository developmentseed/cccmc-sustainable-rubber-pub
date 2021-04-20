"""
Merge CSV and Geojson by shapeID
Use:
    python merge_csvgeojson.py --help
"""

import sys
import json
import pandas as pd
import geopandas as gpd
from geojson import Feature, FeatureCollection as fc

src_file = sys.argv[1]
dst_file_csv = sys.argv[2]
src_file_out = sys.argv[3]

# open the geojson file
gdf = gpd.read_file(src_file)
# clean the properties in geojsonfile
gdf = gdf.filter(["shapeID", "geometry"])
# read the csv file
df = pd.read_csv(dst_file_csv)
# merge csv and geojson
joined_gdf = gdf.merge(df, on="shapeID")
joined_gdf.to_file(src_file_out, driver="GeoJSON")
