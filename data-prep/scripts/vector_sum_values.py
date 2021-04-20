"""
Sum up all values for parent admins
Author: @developmentseed
Run:
    python vector_sum_values.py --help
"""

from geojson import Feature, FeatureCollection as fc
import sys
import json
from shapely.geometry import shape
import pandas as pd

admin_child = sys.argv[1]
admin_parent = sys.argv[2]
field = sys.argv[3]

# Load files
with open(admin_child) as f:
    children = json.load(f).get("features")

with open(admin_parent) as f:
    parents = json.load(f).get("features")

# Loop children
children_values = []
for child in children:
    children_values.append(
        {
            "centroid": shape(child["geometry"]).centroid,
            "value": child["properties"][field],
        }
    )

# Loop parents and sum up values
for parent in parents:
    polygon = shape(parent["geometry"])
    values = []
    for child_value in children_values:
        if polygon.contains(child_value["centroid"]):
            # for obj in child_value["value"]:
            values.append(child_value["value"])
    df = pd.DataFrame(values)
    df_sum = df.sum(axis=0).round(2)
    parent["properties"][field] = df_sum.to_dict()


# Save geojson
with open(admin_parent, "w") as f:
    f.write(json.dumps(fc(parents), ensure_ascii=False).encode("utf8").decode())
