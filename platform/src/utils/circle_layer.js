export default function (options) {
  const {
    id_layer,
    source,
    source_layer,
    // max_value,
    color
  } = options
  const max_value = 200
  const maxZoom = 11
  return {
    id: id_layer,
    source: source,
    'source-layer': source_layer,
    type: 'circle',
    maxzoom: maxZoom,
    paint: {
      'circle-radius': ['/', ['-', max_value, ['get', 'risk_score']], 20],
      'circle-color': color[0],
      'circle-blur': 1,
      // Normalize π§π=(π₯πβmin(π₯))/(max(π₯)βmin(π₯))
      'circle-opacity': [
        '/',
        ['-', ['get', 'risk_score'], ['min', ['get', 'risk_score']]],
        ['-', ['max', ['get', 'risk_score']], ['min', ['get', 'risk_score']]]
      ]
    }
  }
}
