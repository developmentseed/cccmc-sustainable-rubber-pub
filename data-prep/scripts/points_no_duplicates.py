"""
Filter points into geometry, remove duplicates by tag.
Use:
    python points_no_duplicates.py --help
"""

import click
import json
from geojson import Feature, FeatureCollection as fc
from shapely.geometry import shape


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
    short_help="Filter points into geometry, remove duplicates by tag, returns a polygon."
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
    "--filter_tag",
    help="Tag for filter",
    required=True,
    type=str,
)
@click.option(
    "--output_points",
    help="Output geojson points",
    required=True,
    type=str,
)
def main(
    input_boundary,
    input_points,
    filter_tag,
    output_points,
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

    with click.progressbar(points, label="create shape points ") as bar:
        for point in bar:
            point["geo"] = shape(point.get("geometry"))

    # TODO .. process the data
    point_filtered = []
    with click.progressbar(boundaries, label=f"Filter data : {output_points} ") as bar:
        for boundary in bar:
            collect_data = []
            for point in points:
                if boundary["geo"].contains(point.get("geo")):
                    collect_data.append(point)

            # remove duplicates
            filter_data = {x[f"{filter_tag}"]: x for x in collect_data}.values()
            for data in list(filter_data):
                new_data = dict(data)
                del new_data["geo"]
                point_filtered.append(new_data)

    # Save geojson
    with open(output_points, "w") as f:
        f.write(
            json.dumps(fc(point_filtered), ensure_ascii=False).encode("utf8").decode()
        )


if __name__ == "__main__":
    main()
