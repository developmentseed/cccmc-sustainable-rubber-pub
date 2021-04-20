"""
Rubber plantations raster composite and styling
Styling raster files
Author: @developmentseed
Use:
    python rubber_plantations_raster_comps.py --help
"""
import glob
from os import path as op
import click
import numpy as np
import rasterio
from rasterio.io import MemoryFile
from rio_cogeo.cogeo import cog_translate
from rio_cogeo.profiles import cog_profiles


@click.command(short_help="rubber plantations raster composite")
@click.option(
    "-i",
    "--raster_inputs",
    help="Path to rubber raster files - COG",
    required=True,
    type=str,
    default="data/pred/",
)
@click.option(
    "-o",
    "--raster_output",
    help="Raster output file",
    required=True,
    type=str,
    default="data/pred/final_merged_2020-255.tif",
)
def main(raster_inputs, raster_output):
    # Read raster
    cogeo_profile = cog_profiles.get("deflate")
    config = dict(
        GDAL_NUM_THREADS="ALL_CPUS",
        GDAL_TIFF_OVR_BLOCKSIZE="512",
    )
    rubber_layers = glob.glob(raster_inputs + "/*.tif")
    print(rubber_layers)
    with rasterio.open(rubber_layers[0]) as src_a, rasterio.open(
        rubber_layers[1]
    ) as src_b, rasterio.open(rubber_layers[2]) as src_c:
        profile = src_a.profile.copy()
        # update profile
        profile["dtype"] = "uint8"
        # profile["nodata"] = 0
        with MemoryFile() as memfile:
            with memfile.open(**profile) as mem:
                # create output dataset here
                for idx, wind in src_a.block_windows(1):
                    data_a = src_a.read(window=wind)
                    data_b = src_b.read(window=wind)
                    data_c = src_c.read(window=wind)
                    out_arr = np.zeros(data_a.shape, dtype="uint8")

                    mem.write(out, window=wind)
                    data_a = np.where(data_a > 0, 1, out_arr)
                    data_b = np.where(data_b > 0, 1, out_arr)
                    data_c = np.where(data_c > 0, 1, out_arr)
                    out_data = data_a + data_b + data_c
                    out_data = np.where(out_data < 2, 0, out_data)
                    out_data = np.where(out_data >= 2, 255, out_data)
                    mem.write(out_data, window=wind)
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
