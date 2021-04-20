"""
Forest loss raster styling
Styling raster files
Author: @developmentseed
Use:
    python forest_loss_raster_styling.py --help
"""

from os import path as op
import click
import rasterio
import numpy as np
from rasterio.io import MemoryFile
from rio_cogeo import cog_translate, cog_profiles


@click.command(short_help="forest loss raster styling")
@click.option(
    "-i",
    "--raster_input",
    help="Raster file - COG",
    required=True,
    type=str,
)
@click.option(
    "-o",
    "--raster_output",
    help="Raster output file",
    required=True,
    type=str,
)
def main(raster_input, raster_output):
    # Read raster
    cogeo_profile = cog_profiles.get("deflate")
    config = dict(
        GDAL_NUM_THREADS="ALL_CPUS",
        GDAL_TIFF_OVR_BLOCKSIZE="512",
    )

    cmap = {
        1: (255, 246, 201, 1),
        2: (255, 184, 103, 1),
        3: (240, 105, 35, 1),
        4: (0, 48, 184, 1),
    }
    with rasterio.open(raster_input, "r") as src:
        profile = src.profile.copy()
        # update profile
        profile["dtype"] = "uint8"
        profile["nodata"] = 0
        with MemoryFile() as memfile:
            with memfile.open(**profile) as mem:
                mem.write_colormap(1, cmap)
                for index, w in src.block_windows(1):
                    arr = src.read(window=w)
                    out_arr = np.zeros(arr.shape, dtype="uint8")
                    out_arr = np.where((arr > 0) & (arr <= 10), 1, out_arr)
                    out_arr = np.where((arr > 10) & (arr <= 15), 2, out_arr)
                    out_arr = np.where((arr > 15) & (arr <= 18), 3, out_arr)
                    out_arr = np.where(arr > 18, 4, out_arr)
                    mem.write(out_arr, window=w)
                cog_translate(
                    mem,
                    raster_output,
                    cogeo_profile,
                    config=config,
                    in_memory=True,
                    allow_intermediate_compression=True,
                    quiet=False,
                )


if __name__ == "__main__":
    main()
