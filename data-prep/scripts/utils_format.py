"""
Author: @developmentseed
"""

import pyproj
import rasterio


def is_number(n):
    try:
        float(n)
    except ValueError:
        return False
    return True


def checkKey(k):
    k = str(k)
    if is_number(k):
        return str(int(k.split(".")[0]))
    else:
        return k


def round_decimals(list_objs):
    """Round decimal values to 2

    Args:
        list_objs (list): list of objects, e.g [{'min': 1.0, 'max': 5.0, 'mean': 3.57946656923639, 'median': 4.0, 'majority': 4.0}]
    """
    new_list_objs = []
    for obj in list_objs:
        fixed_obj = {str(k): round(float(v), 2) for k, v in obj.items() if is_number(v)}
        new_list_objs.append(fixed_obj)
    return new_list_objs


def reproject_bbox(src, bbox, bbox_crs="epsg:4326"):
    """
    Convert the bounding box to local coordinates of the data
    src is the raster data handler
    bbox, and bbox_crs supplied by user
    returns a rasterio window object
    """
    # bbox has 2 sets, row,col
    data_crs = pyproj.Proj(src.crs)
    bbox_crs = pyproj.Proj(init=bbox_crs)
    lower = pyproj.transform(bbox_crs, data_crs, bbox[0], bbox[1])
    upper = pyproj.transform(bbox_crs, data_crs, bbox[2], bbox[3])
    bottom, left = src.index(lower[0], lower[1])
    top, right = src.index(upper[0], upper[1])
    # merge back into a window
    # Remember gdal reads from the upper left corner
    width = abs(top - bottom)
    height = abs(right - left)
    local_window = rasterio.windows.Window(left, top, width, height)
    # print(local_window)
    return local_window


def extract_subset(cog, bbox, band):
    """
    Given a path to an S3 COG geotiff, a bbox in latlon(e.g. wgs84), a band.
    Extracts a subset of an image by reading a window.
    When used with COGs will only read the required portion of the file.
    BBOX format [minX, minY, maxX, maxY]
    bbox = [11.6, -0.1, 11.7, -0.0]
    Band is the layer in the file, a single band tif, only has 1.
    """
    with rasterio.open(cog) as src:
        local_window = reproject_bbox(src, bbox, bbox_crs="epsg:4326")
        # query the subset with a window
        # todo: modify to allow multiband data sources
        subset = src.read(band, window=local_window)
    return subset, src.crs, src.transform
