"""
Script to reprojects raster files to EPSG:4326
Author: @developmentseed
Use:
    python raster_reproject.py --help
"""
import rasterio
from rasterio.warp import calculate_default_transform, reproject, Resampling
import sys

src_file = sys.argv[1]
dst_file = sys.argv[2]

dst_crs = "EPSG:4326"

with rasterio.open(src_file) as src:
    transform, width, height = calculate_default_transform(
        src.crs, dst_crs, src.width, src.height, *src.bounds
    )
    kwargs = src.meta.copy()
    kwargs.update(
        {"crs": dst_crs, "transform": transform, "width": width, "height": height}
    )

    with rasterio.open(dst_file, "w", **kwargs, compress="DEFLATE") as dst:
        for i in range(1, src.count + 1):
            reproject(
                source=rasterio.band(src, i),
                destination=rasterio.band(dst, i),
                src_transform=src.transform,
                src_crs=src.crs,
                dst_transform=transform,
                dst_crs=dst_crs,
                resampling=Resampling.nearest,
            )
