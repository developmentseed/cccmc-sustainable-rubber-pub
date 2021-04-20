"""
convert the properties of a polygon into csv
Author: @developmentseed
Use:
    python geojson2csv.py --help
"""

import sys
import json
import pandas as pd

src_file = sys.argv[1]
dst_file_csv = sys.argv[2]

# boundaries
with open(src_file) as f:
    boundaries = json.load(f)["features"]

# Save CSV
df = pd.DataFrame([p["properties"] for p in boundaries])
df.to_csv(dst_file_csv, index=False)
