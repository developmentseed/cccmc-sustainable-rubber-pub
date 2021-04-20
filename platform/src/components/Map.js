import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import mapbox from 'mapbox-gl'
import styled, { useTheme } from 'styled-components'

import { themeVal } from '../utils/utils'
import { ChevronLeft, ChevronRight } from './../icons'
import LegendMap from './LegendMap'
import LayerDropdownControl from './Map.LayerDropdownControl'
import config from '../config'
import { useTranslation } from 'react-i18next'

const MapContainer = styled.section`
  @media (min-width: 720px) {
    grid-column: 4 / span ${({ analitycsToggle }) => (analitycsToggle ? 6 : 12)};
    grid-row: 1 / span all;
  }
  position: relative;
`
const ToggleButtonAnalytics = styled.div`
  position: absolute;
  right: 0px;
  background: ${themeVal('colors.background_variant')};
  height: 32px;
  width: 32px;
  top: ${themeVal('space.s4')}px;
  opacity: 0.8;
  z-index: 1;
  display: flex;
  transition: 0.5s;
  > span {
    margin: auto auto;
  }
`
export default function Map ({
  center,
  zoom,
  children,
  layers,
  dispatchSetDataLayer,
  analitycsToggle,
  setAnalitycsToggle,
  stateUIControls,
  adminLevel,
  uicontrols,
  setDisplaySppiner
}) {
  const ref = useRef()
  /**
   * State for Map object
   */
  const [map, setMap] = useState(null)
  const layersId = (layers || []).map((l) => l.id)
  const theme = useTheme()
  const { t, i18n } = useTranslation()
  const lng = i18n.language
  /**
   * State to toggle base layers
   */
  const [checkMap, setCheckMap] = useState(false)

  /**
   * Main useLayoutEffect to set the map
   */
  useLayoutEffect(() => {
    const m = new mapbox.Map({
      container: ref.current,
      style: config.mapBaseStyle,
      center,
      zoom,
      preserveDrawingBuffer: true, // required for the map's canvas to be exported to a PNG
      attributionControl: false
    })

    /**
     * Map layers control
     */
    m.addControl(
      new mapbox.NavigationControl({ visualizePitch: true }),
      'bottom-left'
    )
    m.addControl(LayerDropdownControl, 'bottom-left')

    /**
     * Map Loadding
     */
    m.on('load', () => {
      m.on('click', (e) => {
        highlightBoundary(m, e, adminLevel)
      })

      // m.on('style.load', (e) => {
      // })

      setMap(m)

      if (process.env.NODE_ENV === 'development') {
        // makes map accessible in console for debugging
        window.map = m
      }
      // Add satellite layer
      m.addLayer(
        {
          id: 'base-satellite',
          source: config.sateliteBase,
          type: 'raster',
          layout: { visibility: 'none' }
        },
        'admin-0-boundary-disputed'
      )

      // m.once('idle', () => {
      //   setMapLoaded(true)
      // })
    })

    // waitForMapLoaded(m,)

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  /**
   *
   * @param {Map} m , map object
   * @param {event} e, event from clicking the map
   * @param {array} dataLayersIds Array of layerdata layers to select
   */

  const highlightBoundary = (m, e, dataLayersIds) => {
    if (m) {
      let layerFeatures = []
      if (e) {
        layerFeatures = m.queryRenderedFeatures(e.point, { layers: layersId })
      } else {
        layerFeatures = [m.queryRenderedFeatures({ layers: dataLayersIds })[0]]
      }
      const features = layerFeatures
        .filter((f) => Array.from(layersId).includes(f.layer.id))
        .map((f) => {
          // Check if highlight layer exist for the for selected on the map
          const highlightLayer = `${f.layer.id}_highlight`
          if (typeof m.getLayer(highlightLayer) !== 'undefined') {
            m.setFilter(highlightLayer, ['in', 'shapeID', f.properties.shapeID])
          }
          return {
            layerId: f.layer.id,
            source: f.layer.source,
            sourceLayer: f.layer.sourceLayer,
            properties: f.properties
          }
        })
        .filter((v, i, a) => a.findIndex((t) => t.layerId === v.layerId) === i)

      if (features.length > 0) {
        dispatchSetDataLayer({ type: 'SET_DATALAYER', payload: { features } })
        // Center the map to the feature
        const bbox = JSON.parse(features[0].properties.bbox)
        m.fitBounds(bbox, { padding: 30 })
        setDisplaySppiner(false)
      } else {
        console.log('No selected layer')
      }
    }
  }

  /**
   * Change zoom to the selected country
   */
  useEffect(() => {
    if (map) {
      map.flyTo({
        center: center,
        zoom: zoom,
        bearing: 0,
        speed: 0.7
      })
    }
  }, [zoom, center])

  /**
   * Resize map in case analytics content hide or show.
   */
  useEffect(() => {
    if (map) {
      map.resize()
    }
  }, [analitycsToggle])

  /**
   * Select which layer are the data layer in order to select them automatically
   */
  const waitForMapLoaded = (dataLayersIds) => {
    if (map && !map.loaded()) {
      window.setTimeout(() => {
        waitForMapLoaded(dataLayersIds)
      }, 100)
    } else {
      highlightBoundary(map, null, dataLayersIds)
    }
  }

  /**
   * Once use select country, tiger automatic selection of an element in the map
   */
  useEffect(() => {
    if (!map) return

    map.setZoom(5)
    map.setCenter([100.158992, 20.486377])

    const dataLayersIds = uicontrols
      .map((uic) => {
        if (uic.dataLayer) {
          return uic.controls.map((c) => c.layerIds[0])
        }
      })
      .filter((l) => l)
      .flat()
    waitForMapLoaded(dataLayersIds)
  }, [map, uicontrols])

  /**
   * Toggle between satellite and vector base layer
   */
  useEffect(() => {
    if (map) {
      map.setLayoutProperty(
        'base-satellite',
        'visibility',
        checkMap ? 'visible' : 'none'
      )
    }
    const checkMaplayer = checkMap
      ? t('explore:SatelliteMapOn')
      : t('explore:SatelliteMapOff')
    LayerDropdownControl.render({ checkMap, theme, setCheckMap, checkMaplayer })
  }, [checkMap, lng])

  return (
    <MapContainer id='map' ref={ref} analitycsToggle={analitycsToggle}>
      {map &&
        children &&
        React.Children.map(children, (child) =>
          React.cloneElement(child, {
            map
          })
        )}
      <ToggleButtonAnalytics
        onClick={() => setAnalitycsToggle(!analitycsToggle)}
      >
        {analitycsToggle ? (
          <span role='img' aria-label='chevron right'>
            <ChevronRight color={theme.colors.primary} />
          </span>
        ) : (
          <span role='img' aria-label='chevron right'>
            <ChevronLeft color={theme.colors.primary} />
          </span>
        )}
      </ToggleButtonAnalytics>
      <LegendMap stateUIControls={stateUIControls} />
    </MapContainer>
  )
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  zoom: PropTypes.number.isRequired,
  children: PropTypes.node,
  layers: PropTypes.array,
  dispatchSetDataLayer: PropTypes.func.isRequired,
  analitycsToggle: PropTypes.bool.isRequired,
  setAnalitycsToggle: PropTypes.func.isRequired,
  adminLevel: PropTypes.string.isRequired,
  uicontrols: PropTypes.object.isRequired,
  setDisplaySppiner: PropTypes.func.isRequired
}
