"""
Convert MultiLineString in Points
Author: @developmentseed
Use:
    python line_point.py --help
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


def points_intermediates(p1, p2, nb_points):
    """ "Return a list of nb_points equally spaced points
    between p1 and p2, includes p1 and p2"""

    if not nb_points:
        nb = 3

    x_spacing = (p2[0] - p1[0]) / (nb_points + 1)
    y_spacing = (p2[1] - p1[1]) / (nb_points + 1)
    points = [
        [p1[0] + i * x_spacing, p1[1] + i * y_spacing] for i in range(1, nb_points + 1)
    ] + [p1, p2]
    return points


@click.command(
    short_help="Collects properties of the points found in a polygon, returns a polygon."
)
@click.option(
    "--input_line",
    help="Input geojson line",
    required=True,
    type=str,
)
@click.option(
    "--distance",
    help="Input distance between points (km)",
    default=1,
    type=int,
)
@click.option(
    "--output_points",
    help="Output geojson points",
    required=True,
    type=str,
)
def main(
    input_line,
    distance,
    output_points,
):
    # Lines
    with open(input_line) as f:
        features = json.load(f).get("features")

    points = []
    with click.progressbar(features, label=f"transform data : {input_line} ") as bar:
        for (k, geo) in enumerate(bar):
            properties = geo.get("properties", {})
            properties.update({"id_tmp": k})
            multi_lines = shape(geo.get("geometry"))
            for line in multi_lines:
                line_l = int((line.length * 100) / distance)
                coords = line.coords[:]
                coords_intermediate = points_intermediates(
                    coords[0], coords[-1], nb_points=line_l
                )
                for coord_intermediate in coords_intermediate:
                    points.append(
                        {
                            "type": "Feature",
                            "id_tmp": k,
                            "properties": properties,
                            "geometry": {
                                "type": "Point",
                                "coordinates": coord_intermediate,
                            },
                        }
                    )

    # TODO .. process the data

    # # Save geojson
    with open(output_points, "w") as f:
        f.write(json.dumps(fc(points), ensure_ascii=False).encode("utf8").decode())


if __name__ == "__main__":
    main()
