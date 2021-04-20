"""
Add fields in the polygons according to the adm level,
use the name file and not the polygon
Author: @developmentseed
Use:
    python fields_no_geo.py --help
"""

import click
import json
from geojson import Feature, FeatureCollection as fc

FIELDS = {
    "la-adm0": {
        "corruption_perception_index": {
            "2020": 29,
            "2019": 29,
            "2018": 29,
            "2017": 29,
            "2016": 30,
            "2015": 25,
            "2014": 25,
            "2013": 26,
            "2012": 21,
        },
        "export_rubber_natural": {
            "2019": 68895,
            "2018": 12208,
        },
        "export_rubber_natural_dry": {
            "2019": 155007,
            "2018": 78860,
            "2017": 70843,
        },
        "rubber_annual_price": {
            "2020": 1.73,
            "2019": 1.64,
            "2018": 1.57,
            "2017": 2.0,
            "2016": 1.61,
            "2015": 1.57,
            "2014": 1.95,
            "2013": 2.80,
            "2012": 3.38,
            "2011": 4.82,
            "2010": 3.65,
        },
    },
    "mm-adm0": {
        "corruption_perception_index": {
            "2020": 28,
            "2019": 29,
            "2018": 29,
            "2017": 30,
            "2016": 28,
            "2015": 22,
            "2014": 21,
            "2013": 21,
            "2012": 15,
        },
        "export_rubber_natural": {
            "2019": 16586,
            "2018": 12859,
        },
        "export_rubber_natural_dry": {
            "2019": 106470,
            "2018": 106477,
            "2017": 147195,
            "2016": 96823,
            "2015": 81667,
        },
        "rubber_annual_price": {
            "2020": 1.73,
            "2019": 1.64,
            "2018": 1.57,
            "2017": 2.0,
            "2016": 1.61,
            "2015": 1.57,
            "2014": 1.95,
            "2013": 2.80,
            "2012": 3.38,
            "2011": 4.82,
            "2010": 3.65,
        },
    },
    "vn-adm0": {
        "corruption_perception_index": {
            "2020": 36,
            "2019": 37,
            "2018": 33,
            "2017": 35,
            "2016": 33,
            "2015": 31,
            "2014": 31,
            "2013": 31,
            "2012": 31,
        },
        "export_rubber_natural": {
            "2019": 159289,
            "2018": 61324,
            "2017": 99172,
            "2016": 80289,
            "2015": 73544,
            "2013": 42942,
            "2012": 54126,
        },
        "export_rubber_natural_dry": {
            "2019": 590749,
            "2018": 559463,
            "2017": 473634,
            "2016": 585250,
            "2015": 709029,
            "2013": 674342,
            "2012": 799489,
            "2011": 817502,
            "2010": 782213,
        },
        "import_rubber_natural": {
            "2019": 24243,
        },
        "import_rubber_natural_dry": {
            "2019": 277558,
            "2018": 189071,
        },
        "rubber_annual_price": {
            "2020": 1.73,
            "2019": 1.64,
            "2018": 1.57,
            "2017": 2.0,
            "2016": 1.61,
            "2015": 1.57,
            "2014": 1.95,
            "2013": 2.80,
            "2012": 3.38,
            "2011": 4.82,
            "2010": 3.65,
        },
    },
}


@click.command(short_help="Add fields for specific file")
@click.option(
    "--input_boundary",
    help="Input boundaries geojson (ADM)",
    required=True,
    type=str,
)
@click.option(
    "--output_boundary",
    help="Output geojson boundaries",
    required=True,
    type=str,
)
def main(input_boundary, output_boundary):
    name_file = input_boundary.split("/")[-1].split(".")[0]
    with open(input_boundary) as f:
        boundaries = json.load(f).get("features")

    #  validate name
    if name_file in FIELDS.keys():
        with click.progressbar(boundaries, label=f"Process : {output_boundary}") as bar:
            for boundary in bar:
                properties_boundary = boundary.get("properties")
                properties_boundary.update(FIELDS.get(name_file, {}))

    with open(output_boundary, "w") as f:
        f.write(json.dumps(fc(boundaries), ensure_ascii=False).encode("utf8").decode())


if __name__ == "__main__":
    main()
