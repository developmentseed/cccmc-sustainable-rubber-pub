"""
Rubber plantations raster styling
Styling raster files
Author: @developmentseed
Use:
    python rubber_plantations_raster_styling.py --help
"""

from os import path as op
import click
import numpy as np
import rasterio


@click.command(short_help="rubber plantations raster styling")
@click.option(
    "-i",
    "--raster_input",
    help="Raster file - COG",
    required=True,
    type=str,
)
def main(raster_input):
    # Read raster
    with rasterio.open(raster_input, "r+") as dst:
        dst.write_colormap(
            1,
            {
                # 2020 year
                255: (166, 195, 159, 1)
            },
        )

    dst.close()


if __name__ == "__main__":
    main()
