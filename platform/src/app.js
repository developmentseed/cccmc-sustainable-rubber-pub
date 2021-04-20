import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Explore from './pages/Explore'
import Info from './pages/Info'
import DataInfo from './pages/DataInfo'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './config/globalStyle'
import ConfigContextProvider from './contexts/ConfigContext'
import './i18n'
import config from './config'

export default function App () {
  return (
    <ConfigContextProvider>
      <BrowserRouter>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <ThemeProvider theme={config.theme}>
          <GlobalStyle />
          <Switch>
            <Route path='/explore'>
              <Explore
                siteAcronym={config.siteAcronym}
                siteName={config.siteName}
              />
            </Route>
            <Route path='/datainfo'>
              <DataInfo siteAcronym={config.siteAcronym} />
            </Route>
            <Route path='/info'>
              <Info siteAcronym={config.siteAcronym} />
            </Route>
            <Route path='/'>
              <Home
                siteAcronym={config.siteAcronym}
                siteName={config.siteName}
                imageUrl={config.imageUrl}
              />
            </Route>
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </ConfigContextProvider>
  )
}
