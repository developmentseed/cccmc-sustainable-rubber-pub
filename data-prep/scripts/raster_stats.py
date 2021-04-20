"""
Extract information from raster layers into boundaries
Author: @developmentseed
Use:
    python raster_stats.py --help
"""

from os import path as op
import click
import geopandas as gpd
import json

import rasterio
from rasterio.merge import merge
from rasterio.windows import from_bounds
from rasterstats import zonal_stats

from geojson import Feature, FeatureCollection as fc
from shapely.geometry import shape
import warnings

from utils_format import round_decimals, extract_subset

warnings.simplefilter("ignore")


def multiply(stats, multiply_value):
    for obj_stats in stats:
        for key in obj_stats.keys():
            obj_stats[key] = (obj_stats[key] if obj_stats[key] else 0) * multiply_value
    return stats


def raster_stats(features, raster_file, label, categorical, multiply_value):

    for feature in features:
        bbox = shape(feature["geometry"]).bounds
        # Use merge raise and error with worldpop raster
        # array, affine = merge([raster_file], bounds=bbox)
        with rasterio.open(raster_file) as src:
            # print(src.meta)
            window = from_bounds(*bbox, transform=src.transform)
            array = src.read(1, window=window)
            affine = src.window_transform(window)
            if categorical:
                res = zonal_stats(
                    feature,
                    array,
                    affine=affine,
                    categorical=True,
                )
                res = multiply(res, multiply_value)
            else:
                res = zonal_stats(
                    feature,
                    array,
                    nodata=-9999,
                    affine=affine,
                    stats=[
                        "min",
                        "max",
                        "mean",
                        "median",
                        "count",
                        "majority",
                        "minority",
                        "sum",
                        "range",
                    ],
                )
                res = multiply(res, multiply_value)
            # We check that the polygons has only one value
            feature["properties"][label] = round_decimals(res)[0]
        # print(feature["properties"][label])
    return features


@click.command(short_help="Extract information from raster layers into boundaries")
@click.option(
    "-i",
    "--input_boundary",
    help="Input geojson boundaries",
    required=True,
    type=str,
)
@click.option(
    "-r",
    "--raster_file",
    help="Input landslide raster file",
    required=True,
    type=str,
)
@click.option(
    "-r",
    "--field",
    help="name of the filed to store the data",
    required=True,
    type=str,
)
@click.option(
    "-c",
    "--categorical",
    help="Get stats in categorical values",
    required=True,
    default=False,
    type=bool,
)
@click.option(
    "-c",
    "--multiply_value",
    help="This values will be use on the categorical outputs, to multiply the value",
    required=False,
    default=1.0,
    type=float,
)
@click.option(
    "-o",
    "--output_boundary",
    help="Output geojson boundaries",
    required=True,
    type=str,
)
def main(
    input_boundary, raster_file, field, categorical, multiply_value, output_boundary
):

    # boundaries
    with open(input_boundary) as f:
        boundaries = json.load(f)["features"]

    print(f"Number of polygons: {len(boundaries)} for {input_boundary}")

    # Get stats from raster
    boundaries = raster_stats(
        boundaries, raster_file, field, categorical, multiply_value
    )
    # Save geojson
    with open(output_boundary, "w") as f:
        f.write(json.dumps(fc(boundaries), ensure_ascii=False).encode("utf8").decode())


if __name__ == "__main__":
    main()
