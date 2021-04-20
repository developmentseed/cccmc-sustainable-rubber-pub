export default function (options) {
  const { id_layer, source, source_layer, color, outline, attributes } = options

  const maxZoom = 21
  return {
    id: id_layer,
    source: source,
    'source-layer': source_layer,
    type: 'fill',
    maxzoom: maxZoom,
    paint: {
      'fill-color': color || 'rgba(0,0,0,0.5)',
      // 'fill-opacity': 0.4 ,
      'fill-outline-color': outline || 'rgba(0,0,0,0.05)'
    },
    attributes
  }
}
