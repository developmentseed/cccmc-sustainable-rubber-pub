export default function (options) {
  const { id_layer, source, source_layer, color, filter, attributes } = options
  return {
    id: id_layer,
    source: source,
    'source-layer': source_layer,
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': color,
      'line-width': 3
    },
    filter,
    attributes
  }
}
