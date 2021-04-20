"""
Calculates the intersected area between two polygons
the area is in km2
Author: @developmentseed
Use:
    python area_intersection.py --help
"""

import click
import json
from geojson import Feature, FeatureCollection as fc
from shapely.geometry import shape, mapping, MultiPolygon, Polygon
import shapely.ops as ops
import pyproj


def calculare_area_km2(intersection, intersection_polygon_proj):
    area_km = 0
    if intersection.geom_type == "Polygon":
        intersection = MultiPolygon(
            [
                intersection,
            ]
        )

    for intersection_polygon in intersection:
        x, y = intersection_polygon.exterior.coords.xy
        x, y = intersection_polygon_proj(list(x[:-1]), list(y[:-1]))
        area = shape({"type": "Polygon", "coordinates": [zip(x, y)]}).area / (
            1000 * 1000
        )
        area_km += area

    return round(area_km, 2)


@click.command(short_help="Calculates the intersected area between two polygons")
@click.option(
    "--input_boundary",
    help="Input boundaries geojson (ADM)",
    required=True,
    type=str,
)
@click.option(
    "--input_polygons",
    help="Input polygons geojson",
    required=True,
    type=str,
)
@click.option(
    "--area_label",
    help="Input area label",
    required=True,
    type=str,
)
@click.option(
    "--polygon_field",
    help="Input area label",
    required=False,
    default="",
    type=str,
)
@click.option(
    "--output_boundary",
    help="Output geojson boundaries",
    required=True,
    type=str,
)
def main(input_boundary, input_polygons, polygon_field, area_label, output_boundary):
    with open(input_boundary) as f:
        boundaries = json.load(f).get("features")

    with open(input_polygons) as f:
        polygons = json.load(f).get("features")

    for boundary in boundaries:
        boundary["geo"] = shape(boundary.get("geometry"))

    for polygon in polygons:
        polygon["geo"] = shape(polygon.get("geometry"))
    #     mode
    mode = "only_area"
    if polygon_field:
        mode = "field_area"
    boundaries_invalid = []
    with click.progressbar(boundaries, label=f"Process : {output_boundary}") as bar:
        for boundary in bar:
            properties_boundary = boundary.get("properties")
            properties_geo = boundary.get("geo")
            # area boundary
            wb, sb, eb, nb = properties_geo.bounds
            properties_geo_proj = pyproj.Proj(proj="aea", lat_1=sb, lat_2=nb)
            properties_boundary["area"] = calculare_area_km2(
                properties_geo, properties_geo_proj
            )
            result = 0
            if mode == "field_area":
                result = {}

            for geometry in polygons:
                properties_geometry = geometry.get("properties")
                geometry_sha = geometry.get("geo")

                #  evaluate if shape is multipligon
                if geometry_sha.geom_type == "Polygon":
                    geometry_sha = MultiPolygon(
                        [
                            geometry_sha,
                        ]
                    )
                #  if only_area, flag = true, other depends if exist  polygon_field
                flag = True
                if mode == "field_area":
                    flag = properties_geometry.get(polygon_field, None) is not None

                for poly_sha in geometry_sha:
                    if (
                        properties_geo.intersects(poly_sha)
                        and flag
                        and poly_sha.is_valid
                    ):
                        intersection = properties_geo.intersection(poly_sha)
                        w, s, e, n = intersection.bounds
                        intersection_polygon_proj = pyproj.Proj(
                            proj="aea", lat_1=s, lat_2=n
                        )
                        area = calculare_area_km2(
                            intersection, intersection_polygon_proj
                        )
                        if mode == "field_area":
                            field = str(properties_geometry.get(polygon_field))
                            if field in result.keys():
                                result[f"{field}"] += area
                            else:
                                result.update({f"{field}": area})
                        else:
                            result += area

            properties_boundary[f"{area_label}"] = result
            del boundary["geo"]

    with open(output_boundary, "w") as f:
        f.write(json.dumps(fc(boundaries), ensure_ascii=False).encode("utf8").decode())

    with open(output_boundary.replace(".geojson", "_invalid.geojson"), "w") as f:
        f.write(
            json.dumps(fc(boundaries_invalid), ensure_ascii=False)
            .encode("utf8")
            .decode()
        )


if __name__ == "__main__":
    main()
