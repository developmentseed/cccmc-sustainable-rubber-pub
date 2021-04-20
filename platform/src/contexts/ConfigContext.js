import React, { createContext, useReducer, useState } from 'react'
import { countryReducer } from '../reducers/countryReducer'
import config from '../config'

export const ConfigContext = createContext()

// List the countries from the config
const countries = Object.entries(config.countries).map(
  ([key, countryConfig]) => {
    return {
      countryName: countryConfig.countryName,
      countryCode: countryConfig.countryCode
    }
  }
)

// List the layers from the country
const allLayers = Object.entries(config.countries)
  .map(([key, countryConfig]) => {
    return countryConfig.layers
  })
  .flat()
  .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)

// Map Sources
const sources = config.sources

// Create context provider
const ConfigContextProvider = (props) => {
  // create reducer that starts with laos config
  const [adminLevel, dispatchSetAdminLevel] = useReducer(
    countryReducer,
    'country'
  )
  // reducer contry config
  const [countryConfig, dispatchSetCountryConfig] = useReducer(
    countryReducer,
    {}
    // config.countries.la
  )

  const [randomKey, setRandomKey] = useState('key')

  return (
    <ConfigContext.Provider
      value={{
        countries,
        allLayers,
        sources,
        countryConfig,
        dispatchSetCountryConfig,
        adminLevel,
        dispatchSetAdminLevel,
        randomKey,
        setRandomKey
      }}
    >
      {props.children}
    </ConfigContext.Provider>
  )
}

export default ConfigContextProvider
