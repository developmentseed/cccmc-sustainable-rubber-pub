"""
Sum the estimated population ages 15 to 59, both sexes, 2010
Author: @developmentseed
Run:
    python sum_age_15_59.py --help
"""
import click
import json
from geojson import Feature, FeatureCollection as fc


@click.command(
    short_help="Sum the estimated population from ages 15 to 59, returns points with a new atribute of the sum."
)
@click.option("--file_path", help="Path to geojson/csv file", required=True, type=str)
@click.option("--output_file", help="Output path", required=True, type=str)
def main(
    file_path,
    output_file,
):
    # open
    with open(file_path) as f:
        json_data = json.load(f).get("features")
    gpw_agepop_2010 = 0
    for i in json_data:
        properties = i.get(
            "properties",
        )

        gpw_agepop_2010 = (
            properties.get(
                "A15_19B",
            )
            + properties.get(
                "A20_24B",
            )
            + properties.get(
                "A25_29B",
            )
            + properties.get(
                "A30_34B",
            )
            + properties.get(
                "A35_39B",
            )
            + properties.get(
                "A40_44B",
            )
            + properties.get(
                "A45_49B",
            )
            + properties.get(
                "A50_54B",
            )
            + properties.get(
                "A55_59B",
            )
        )
        properties["gpw_agepop_2010"] = gpw_agepop_2010

    with open(output_file, "w") as f:
        f.write(json.dumps(fc(json_data), ensure_ascii=False).encode("utf8").decode())


if __name__ == "__main__":
    main()
