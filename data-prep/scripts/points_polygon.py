"""
Collects properties of the points found in a polygon
Author: @developmentseed
Use:
    python points_polygon.py --help
"""

from os import path as op
import click
import geopandas as gpd
import rasterio
from rasterio.plot import show
from rasterstats import zonal_stats
import json
from geojson import Feature, FeatureCollection as fc
from shapely.geometry import shape

from utils_format import round_decimals


def clean_str(text):
    if not text:
        return ""
    return str(text).lower().strip().replace(" ", "_")


def clean_int(text):
    try:
        return int(text)
    except Exception as ex:
        return 0


@click.command(
    short_help="Collects properties of the points found in a polygon, returns a polygon."
)
@click.option(
    "--input_boundary",
    help="Input geojson boundaries",
    required=True,
    type=str,
)
@click.option(
    "--input_points",
    help="Input geojson points",
    required=True,
    type=str,
)
@click.option(
    "--properties_string",
    help="Propertie of point (string)",
    required=True,
    multiple=True,
    type=str,
)
@click.option(
    "--properties_int",
    help="Propertie of point (int), the total will be calculated ",
    required=False,
    multiple=True,
    type=str,
)
@click.option(
    "--properties_mix",
    help="Count Two properties, separate by __ ",
    required=False,
    multiple=True,
    type=str,
)
@click.option(
    "--prefix",
    help="prefix of collect properties",
    required=True,
    type=str,
)
@click.option(
    "--output_boundary",
    help="Output geojson boundaries",
    required=True,
    type=str,
)
def main(
    input_boundary,
    input_points,
    properties_string,
    properties_int,
    properties_mix,
    prefix,
    output_boundary,
):
    # boundaries
    with open(input_boundary) as f:
        boundaries = json.load(f).get("features")

    with open(input_points) as f:
        points = json.load(f).get("features")

    # Loop foor each boundary : polygon

    with click.progressbar(boundaries, label="create shape boundary ") as bar:
        for boundary in bar:
            boundary["geo"] = shape(boundary.get("geometry"))

    # TODO .. process the data

    with click.progressbar(
        boundaries, label=f"Collect data : {output_boundary}"
    ) as bar:
        for boundary in bar:
            collect_data = []
            for point in points:
                if boundary["geo"].contains(shape(point.get("geometry"))):
                    point_properties = point.get("properties")
                    point_properties_filtered = {}
                    for prop in properties_string + properties_int:
                        if point_properties.get(prop):
                            point_properties_filtered.update(
                                {prop: point_properties[prop]}
                            )
                    # props mixin
                    for prop_mix in properties_mix:
                        if all(
                            [i in point_properties.keys() for i in prop_mix.split("__")]
                        ):
                            value = "__".join(
                                [
                                    f"{point_properties.get(i)}"
                                    for i in prop_mix.split("__")
                                ]
                            )
                            point_properties_filtered.update({f"{prop_mix}": value})

                    collect_data.append(point_properties_filtered)
            # calculate stats
            stats_str = {}
            stats_int = {}

            for collect in collect_data:
                #  str props
                for i_str in properties_string + properties_mix:
                    if collect.get(i_str):
                        if stats_str.get(i_str):
                            if stats_str[i_str].get(f"{clean_str(collect[i_str])}"):
                                stats_str[i_str][f"{clean_str(collect[i_str])}"] += 1
                            else:
                                stats_str[i_str][f"{clean_str(collect[i_str])}"] = 1

                        else:
                            stats_str[i_str] = {f"{clean_str(collect[i_str])}": 1}
                # int props
                for i_int in properties_int:
                    if collect.get(i_int):
                        if stats_int.get(i_int):
                            stats_int[i_int] += clean_int(collect[i_int])
                        else:
                            stats_int[i_int] = clean_int(collect[i_int])

            # insert into boundary
            stats_str.update(stats_int)
            # separate by prefix
            for str_key, str_value in stats_str.items():
                boundary["properties"][f"{prefix}_{str_key}"] = str_value
            # remove geo in boundary :
            del boundary["geo"]

    # Save geojson
    with open(output_boundary, "w") as f:
        f.write(json.dumps(fc(boundaries), ensure_ascii=False).encode("utf8").decode())


if __name__ == "__main__":
    main()
