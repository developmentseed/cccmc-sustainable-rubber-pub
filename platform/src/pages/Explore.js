import PropTypes from 'prop-types'
import React, { useReducer, useContext, useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import PageLayout from '../components/PageLayout'
import Drawer from '../components/Drawer'
import Map from '../components/Map'
import Source from '../components/Source'
import Layer from '../components/Layer'
import LayerControl from '../components/LayerControl'
import { layerReducer } from '../reducers/layersReducer'
import { init, getControlIdForLayer } from '../utils/exploreUtils'
import { ConfigContext } from '../contexts/ConfigContext'
import Analytics from '../components/Analytics'
import ModalSelector from '../components/ModalSelector'
import Spinner from '../components/Spinner'
export default function Explore ({ siteAcronym, siteName }) {
  const theme = useTheme()

  // Get values from context
  const {
    countryConfig,
    adminLevel,
    sources,
    allLayers,
    randomKey
  } = useContext(ConfigContext)
  // Get
  const uicontrols = countryConfig.uicontrols
    ? countryConfig.uicontrols[adminLevel]
    : []

  // Create reducer for display layers on the map
  const [stateUIControls, dispatchUIControls] = useReducer(
    layerReducer,
    uicontrols,
    init
  )

  // /**
  //  * Set zoom for map
  //  */
  // const [checkMap, setCheckMap] = useState(false)

  /**
   *  useEffect will execute everytime when countryConfig is updated
   */
  useEffect(() => {
    setDisplaySppiner(true)

    if (countryConfig.uicontrols) {
      dispatchUIControls({
        type: 'reset',
        payload: countryConfig.uicontrols[adminLevel]
      })
    }
  }, [countryConfig, adminLevel])

  // clickLayersData are data when we click the layer in the map an come up the layers
  const [clickLayersData, dispatchSetClickLayersData] = useReducer(
    layerReducer,
    []
  )

  const toggleLayer = (controlId) => {
    dispatchUIControls({ type: 'toggleLayer', payload: controlId })
  }
  const changeSlider = (payload) => {
    dispatchUIControls({ type: 'setSlider', payload })
  }
  const clearAll = () => {
    dispatchSetClickLayersData({ type: 'CLEAR_DATALAYER' })
    dispatchUIControls({
      type: 'reset',
      payload: countryConfig.uicontrols[adminLevel]
    })
  }
  const clearDatalayers = () => {
    dispatchSetClickLayersData({ type: 'CLEAR_DATALAYER' })
  }

  const hasSelectedLayers = Object.values(stateUIControls).some(
    (control) => control.visibility
  )
  const [analitycsToggle, setAnalitycsToggle] = useState(true)

  const [displaySppiner, setDisplaySppiner] = useState(true)

  return (
    <PageLayout siteAcronym={siteAcronym} theme={theme} noMargin>
      {/* Display menu only when we set the uicontrols} */}
      {countryConfig.uicontrols ? (
        <Drawer
          siteName={siteName}
          country={countryConfig.countryName}
          cc={countryConfig.countryCode}
          clearAll={clearAll}
          hasSelectedLayers={hasSelectedLayers}
          clearDatalayers={clearDatalayers}
        >
          <LayerControl
            uiState={stateUIControls}
            uicontrols={uicontrols}
            toggleLayer={toggleLayer}
            changeSlider={changeSlider}
          />
          <Spinner displaySppiner={displaySppiner} />
        </Drawer>
      ) : (
        <>
          <ModalSelector clearDatalayers={clearDatalayers} />
        </>
      )}

      {/* Display map only when we set the uicontrols} */}
      <Map
        zoom={countryConfig.zoom || 5}
        center={countryConfig.center || [100.158992, 20.486377]}
        layers={allLayers}
        dispatchSetDataLayer={dispatchSetClickLayersData}
        analitycsToggle={analitycsToggle}
        setAnalitycsToggle={setAnalitycsToggle}
        stateUIControls={stateUIControls}
        adminLevel={adminLevel}
        uicontrols={uicontrols}
        setDisplaySppiner={setDisplaySppiner}
      >
        {Object.entries(sources).map(([type, list]) =>
          list.map((source) => (
            <Source
              key={source.id}
              id={source.id}
              type={type}
              tilesetid={source.tilesetid ? source.tilesetid : ''}
              geojson={source.geojson ? source.geojson : ''}
            >
              {allLayers
                .filter((layer) => layer.source === source.id)
                .map((layer) => {
                  const controlId = getControlIdForLayer(layer.id, uicontrols)
                  return (
                    <Layer
                      key={layer.id}
                      id={layer.id}
                      isVisible={
                        stateUIControls[controlId]
                          ? stateUIControls[controlId].visibility
                          : false
                      }
                      spec={layer}
                      before='road-label' // This is a layer id from the basemap. It might not exist in other basemaps styles!
                    />
                  )
                })}
            </Source>
          ))
        )}
      </Map>

      {/* Display analytics only when we set the uicontrols} */}
      {analitycsToggle && countryConfig.uicontrols ? (
        <Analytics
          key={randomKey}
          mapLayersData={clickLayersData.dataLayers}
          allLayers={allLayers}
          adminLevel={adminLevel}
          stateUIControls={stateUIControls}
        />
      ) : null}
    </PageLayout>
  )
}

Explore.propTypes = {
  siteAcronym: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired
}
