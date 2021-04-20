"""
Land use raster styling
Styling raster files
Author: @developmentseed
Use:
    python landuse_raster_styling.py --help
"""

from os import path as op
import click
import rasterio
import numpy as np
from rasterio.io import MemoryFile
from rio_cogeo import cog_translate, cog_profiles


@click.command(short_help="Land use raster styling")
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
        1: (250, 239, 207, 1),
        2: (158, 91, 46, 1),
        3: (106, 61, 11, 1),
        4: (255, 255, 255, 0),
        5: (102, 84, 59, 1),
        6: (255, 255, 255, 0),
        7: (255, 255, 255, 0),
        8: (182, 193, 151, 1),
        9: (88, 112, 85, 1),
        10: (45, 106, 79, 1),
        11: (255, 255, 255, 0),
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
                    out_arr = np.where((arr == 20), 1, out_arr)
                    out_arr = np.where((arr == 30), 2, out_arr)
                    out_arr = np.where((arr == 40), 3, out_arr)
                    out_arr = np.where((arr == 50), 4, out_arr)
                    out_arr = np.where((arr == 60), 5, out_arr)
                    out_arr = np.where((arr == 70), 6, out_arr)
                    out_arr = np.where((arr == 80), 7, out_arr)
                    out_arr = np.where((arr == 90), 8, out_arr)
                    out_arr = np.where((arr == 100), 9, out_arr)
                    out_arr = np.where((arr >= 111) & (arr <= 116), 10, out_arr)
                    out_arr = np.where((arr >= 121) & (arr <= 126), 10, out_arr)
                    out_arr = np.where((arr == 200), 11, out_arr)
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
