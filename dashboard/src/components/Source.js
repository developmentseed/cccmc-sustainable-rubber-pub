import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Source ({ id, type, tilesetid, geojson, map, children }) {
  const [source, setSource] = useState(null)

  const tileSize = type === 'raster' ? 256 : 512

  useEffect(() => {
    let s = map.getSource(`${id}-source`)
    if (!s) {
      if (type === 'raster' || type === 'vector') {
        s = map.addSource(id, {
          type,
          url: `mapbox://${tilesetid}`,
          tileSize
        })
      } else {
        s = map.addSource(id, {
          type,
          data: geojson
        })
      }
    }

    setSource(s)

    return () => {
      if (source) map.removeSource(id)
    }
  }, [])
  return (
    <>
      {source &&
        children &&
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            map: map,
            sourceId: id
          })
        )}
    </>
  )
}

Source.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['raster', 'vector', 'geojson']),
  tilesetid: PropTypes.string.isRequired,
  geojson: PropTypes.string,
  map: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}
