"""
Market accessibility raster styling
Author: @developmentseed
Use:
    python market_accessibility_raster_styling.py --help
"""

from os import path as op
import click
import rasterio
import numpy as np
from rasterio.io import MemoryFile
from rio_cogeo import cog_translate, cog_profiles


@click.command(short_help="market accessibility raster styling")
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
        1: (214, 234, 248, 1),
        2: (174, 214, 241, 1),
        3: (133, 193, 233, 1),
        4: (93, 173, 226, 1),
        5: (46, 134, 193, 1),
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
                    out_arr = np.where((arr > 0) & (arr <= 180), 1, out_arr)
                    out_arr = np.where((arr > 180) & (arr <= 360), 2, out_arr)
                    out_arr = np.where((arr > 360) & (arr <= 720), 3, out_arr)
                    out_arr = np.where((arr > 720) & (arr <= 1440), 4, out_arr)
                    out_arr = np.where(arr > 1440, 5, out_arr)
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
