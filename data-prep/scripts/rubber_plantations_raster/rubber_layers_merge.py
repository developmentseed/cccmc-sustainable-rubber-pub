"""
Merge rubber layers at different spatial resolution
the first layer is in 10m and another one is 250m
Author: @developmentseed

Use:
    python rubber_layers_merge.py --help
"""

import os
import glob
from os import path as op
import rasterio
import numpy as np
from rasterio.io import MemoryFile
from rio_cogeo.cogeo import cog_translate
from rio_cogeo.profiles import cog_profiles
from rasterio.vrt import WarpedVRT


@click.command(short_help="rubber plantations raster styling")
@click.option(
    "-r1",
    "--raster_a",
    help="Path to rubber raster files - COG",
    required=True,
    type=str,
)
@click.option(
    "-r2",
    "--raster_b",
    help="Raster output file",
    required=True,
    type=str,
)
@click.option(
    "-o",
    "--raster_out",
    help="Raster output file",
    required=True,
    type=str,
)
def main(raster_a, raster_b, raster_out):

    cogeo_profile = cog_profiles.get("deflate")
    config = dict(
        GDAL_NUM_THREADS="ALL_CPUS",
        GDAL_TIFF_OVR_BLOCKSIZE="512",
    )
    with rasterio.open(raster_a) as tf_a, rasterio.open(raster_b) as tf_b:
        profile = tf_a.profile.copy()
        # update profile
        profile["dtype"] = "uint8"
        profile["nodata"] = 0
        # to transform image b to a's
        with WarpedVRT(
            tf_b,
            transform=tf_a.transform,
            width=tf_a.width,
            height=tf_a.height,
        ) as tf_b_vrt:
            with MemoryFile() as memfile:
                with memfile.open(**profile) as mem:
                    for idx, wind in tf_a.block_windows(1):
                        data_a = tf_a.read(window=wind)
                        data_b = tf_b_vrt.read(window=wind)
                        out_data = np.zeros(data_a.shape, dtype="uint8")
                        data_b = np.expand_dims(np.sum(data_b, axis=(0)), 0)
                        print(f"original 2010 rubber max value is {data_b.max()}")
                        data_b = np.where(data_b > 0, 1, 0)
                        print("*" * 40)
                        print("new shapes of rubber layer 2020 and 2010 are:")
                        print(data_b.shape)
                        print(data_a.shape)
                        print("max values of rubber layer 2020 and 2010 are:")
                        print(data_a.max(), data_b.max())
                        print("*" * 40)
                        if data_a.shape == data_b.shape:
                            out_arr = data_a + data_b
                        else:
                            out_arr = data_a
                        out_arr = np.where(out_arr > 0, 1, out_data)
                        #                         print(out_arr.shape)
                        mem.write(out_arr, window=wind)
                    cog_translate(
                        mem,
                        raster_out,
                        cogeo_profile,
                        config=config,
                        in_memory=True,
                        allow_intermediate_compression=True,
                        quiet=False,
                    )


if __name__ == "__main__":
    main()
