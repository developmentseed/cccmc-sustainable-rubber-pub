export default function (options) {
  const { id_layer, source, maxZoom = 21, raster_opacity } = options

  return {
    id: id_layer,
    source: source,
    type: 'raster',
    maxzoom: maxZoom,
    paint: {
      'raster-opacity': raster_opacity
    }
  }
}
