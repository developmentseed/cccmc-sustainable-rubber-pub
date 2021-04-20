"""
Sum population values of points into parents
Author: @developmentseed
Use:
    python sum_points_values.py --help
"""

from os import path as op
import click
import pandas as pd
import rasterio
from rasterio.plot import show
from rasterstats import zonal_stats
import json
from geojson import Feature, FeatureCollection as fc
from shapely.geometry import shape


@click.command(
    short_help="Sum values of population of points found in a polygon, returns a polygon."
)
@click.option(
    "--admin_parent",
    help="Input geojson parents",
    required=True,
    type=str,
)
@click.option(
    "--admin_child",
    help="Input geojson points",
    required=True,
    type=str,
)
@click.option(
    "--output_boundary",
    help="Output geojson parents",
    required=True,
    type=str,
)
def main(
    admin_parent,
    admin_child,
    output_boundary,
):
    # parents
    with open(admin_parent) as f:
        parents = json.load(f).get("features")

    with open(admin_child) as f:
        children = json.load(f).get("features")

    # Loop children
    children_2010_age = []
    children_2020_DS = []
    children_2015_DS = []
    children_2010_DS = []
    children_2005_DS = []
    children_2000_DS = []

    for child in children:
        children_2010_age.append(
            {
                "centroid": shape(child["geometry"]).centroid,
                "agevalue10": child["properties"]["gpw_agepop_2010"],
            }
        )
        children_2020_DS.append(
            {
                "centroid": shape(child["geometry"]).centroid,
                "dsvalue20": child["properties"]["UN_2020_DS"],
            }
        )
        children_2015_DS.append(
            {
                "centroid": shape(child["geometry"]).centroid,
                "dsvalue15": child["properties"]["UN_2015_DS"],
            }
        )
        children_2010_DS.append(
            {
                "centroid": shape(child["geometry"]).centroid,
                "dsvalue10": child["properties"]["UN_2010_DS"],
            }
        )
        children_2005_DS.append(
            {
                "centroid": shape(child["geometry"]).centroid,
                "dsvalue05": child["properties"]["UN_2005_DS"],
            }
        )
        children_2000_DS.append(
            {
                "centroid": shape(child["geometry"]).centroid,
                "dsvalue00": child["properties"]["UN_2000_DS"],
            }
        )

    # Loop parents and sum up values
    for parent in parents:
        polygon = shape(parent["geometry"])
        values_age2010 = []
        values_ds2020 = []
        values_ds2015 = []
        values_ds2010 = []
        values_ds2005 = []
        values_ds2000 = []

        for child_age_value in children_2010_age:
            if polygon.contains(child_age_value["centroid"]):
                values_age2010.append(child_age_value["agevalue10"])
        Sum = sum(values_age2010)
        parent["properties"]["agepop_2010"] = round(Sum)

        for child_ds2020 in children_2020_DS:
            if polygon.contains(child_ds2020["centroid"]):
                values_ds2020.append(child_ds2020["dsvalue20"])
        Sumds2020 = sum(values_ds2020)

        for child_ds2015 in children_2015_DS:
            if polygon.contains(child_ds2015["centroid"]):
                values_ds2015.append(child_ds2015["dsvalue15"])
        Sumds2015 = sum(values_ds2015)

        for child_ds2010 in children_2010_DS:
            if polygon.contains(child_ds2010["centroid"]):
                values_ds2010.append(child_ds2010["dsvalue10"])
        Sumds2010 = sum(values_ds2010)

        for child_ds2005 in children_2005_DS:
            if polygon.contains(child_ds2005["centroid"]):
                values_ds2005.append(child_ds2005["dsvalue05"])
        Sumds2005 = sum(values_ds2005)

        for child_ds2000 in children_2000_DS:
            if polygon.contains(child_ds2000["centroid"]):
                values_ds2000.append(child_ds2000["dsvalue00"])
        Sumds2000 = sum(values_ds2000)

        parent["properties"]["gpw_dspop"] = {
            "2020": round(Sumds2020),
            "2015": round(Sumds2015),
            "2010": round(Sumds2010),
            "2005": round(Sumds2005),
            "2000": round(Sumds2000),
        }

    # Save geojson
    with open(output_boundary, "w") as f:
        f.write(json.dumps(fc(parents), ensure_ascii=False).encode("utf8").decode())


if __name__ == "__main__":
    main()
