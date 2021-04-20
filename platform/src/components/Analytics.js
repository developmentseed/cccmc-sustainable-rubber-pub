import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption
} from '@reach/listbox'
import '@reach/listbox/styles.css'

import AnalyticsPlot from './AnalyticsPlot'
import { themeVal } from '../utils/utils'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from '../icons'
import exportPDF from '../utils/export_pdf'
import exportMapPNG from '../utils/export_png'
import exportCSV from '../utils/export_csv'

const AnalyticsContainer = styled.section`
  @media (min-width: 720px) {
    grid-column: 10 / span 12;
    grid-row: 1 / span all;
  }

  display: flex;
  flex-direction: column;
  grid-template-rows: repeat(12, 1fr);
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.25);

  background: ${themeVal('colors.background_variant')};
  z-index: 2;
`
const AnalyticsHeaderContainer = styled.div`
  text-align: left;
  padding: ${themeVal('space.s8')}px ${themeVal('space.s16')}px;
  display: flex;
  align-content: space-between;

  > label {
    margin: 0;
    font-size: ${themeVal('fontSizes.small_title')}px;
    font-weight: ${themeVal('fontWeights.heading')};
    text-align: start;
    flex: 1;
  }
  > span {
    margin: 0;
    color: ${themeVal('colors.title_container')};
    font-size: ${themeVal('fontSizes.small_title')}px;
    font-weight: ${themeVal('fontWeights.heading')};
    text-align: end;

    > small {
      font-size: ${themeVal('fontSizes.x_small_text')}px;
      margin-left: ${themeVal('space.s4')}px;
    }
  }
`
const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  border-top: 1px solid ${themeVal('colors.accent')};
  background: ${themeVal('colors.background_variant')};
  padding: ${themeVal('space.s8')}px ${themeVal('space.s16')}px;
`
const AnalyticsDownloadContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: ${themeVal('space.s16')}px;
  gap: ${themeVal('space.s8')}px;
  background: ${themeVal('colors.background')};
`

const ListboxInputStyled = styled(ListboxInput)`
  position: relative;
  z-index: 99999;
  display: inline-grid;

  > span {
    cursor: ${({ selected }) => (selected ? `default` : `pointer`)};
    text-decoration: none;
    display: inline;
    text-align: center;
    vertical-align: middle;
    font-family: ${themeVal('fonts.body')};

    border-style: solid;
    border-width: 0px;
    border-radius: ${themeVal('borderRadius')}px;
    background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary_variant : theme.colors.muted};
    height: ${themeVal('space.s40')}px;
    line-height: 35px;
    color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.offtext};
    font-size: ${themeVal('fontSizes.small_text')}px;
    text-transform: uppercase;
    font-weight: ${themeVal('fontWeights.heading')};
    padding: 0px;
    margin: 0px;
    > [data-reach-listbox-arrow] {
      display: inline;
    }
  }
`
const ListboxButtonStyled = styled(ListboxButton)`
  border: 0px;
  padding: 0px;
  display: inline;
`
const CustomListboxOption = styled(ListboxOption)`
  > span {
    margin-left: auto;
    text-transform: uppercase;
    color: ${themeVal('colors.offtext')};
    font-size: 10px;
  }
`
/**
 * Return and array of objects for ploting, for all layer that is in the map
 * @param {array[objects]} mapLayersData, it is comming from clicking a polygon in the map
 * @param {array[objects]} allLayers, it is comming from all layer in the config
 * @returns
 */
export const getDataForPlotting = (mapLayersData, allLayers) => {
  if (mapLayersData) {
    const clickedLayers = mapLayersData.map((mapLayerData) => {
      return allLayers
        .map((layer) => {
          if (layer.id === mapLayerData.layerId) {
            if (layer.attributes) {
              return layer.attributes.map((attribute) => {
                attribute['data'] = JSON.parse(
                  mapLayerData.properties[attribute.key] || null
                )
                return attribute
              })
            } else {
              return []
            }
          }
        })
        .flat()
        .filter((o) => o)
    })
    return clickedLayers
  } else {
    return []
  }
}

export const formatData = (dataStats) => {
  // Need to fix
  let data = null
  if (dataStats.data instanceof Object) {
    let dataValues = {}
    Object.entries(dataStats.data).forEach((item) => {
      let key = `${item[0]}`
      if (!isNaN(key)) {
        key = `${parseInt(item[0])}`
      }
      dataValues[key] = item[1]
    })
    data = Object.entries(dataStats.config || {})
      .map((item) => {
        const key = item[0]
        const val = item[1]
        val['val'] = dataValues[key]
        return val
      })
      .filter((i) => i.val)
    if (data.length === 0) {
      data = null
    }
  } else {
    data = dataStats.data
  }

  return data
}

export const objTranslation = (t, objsForPlotting) => {
  return objsForPlotting.map((item) => {
    item.title = t(`explore:${item.title}`)
    item.unit = t(`explore:${item.unit}`)
    if (item.data instanceof Object) {
      item.data = item.data
        ? item.data.map((d) => {
          return { ...d, name: t(`explore:${d.name}`) }
        })
        : []
    }
    return item
  })
}

const buttomOptions = [
  {
    value: 'DOWNLOAD',
    text: 'DOWNLOAD',
    type: ''
  },
  {
    value: 'ANALYTICS_REPORT',
    text: 'ANALYTICS REPORT',
    type: '[PDF]'
  },
  {
    value: 'MAP',
    text: 'MAP',
    type: '[PNG]'
  },
  {
    value: 'AREA_OF_INTEREST',
    text: 'AREAS OF INTEREST',
    type: '[CSV]'
  }
]

const Analytics = ({
  mapLayersData,
  allLayers,
  adminLevel,
  stateUIControls
}) => {
  // Because some layers has empty arrays lets, flat them
  let objsForPlotting = getDataForPlotting(mapLayersData, allLayers).flat()
  objsForPlotting = objsForPlotting.map((plot) => {
    // Get length of legend string, in order to rotate
    let legendTextLength = 4
    const data = formatData(plot)
    if (Array.isArray(data)) {
      legendTextLength = Math.max(...data.map((d) => d.name.length))
    }

    return {
      ...plot,
      data,
      legendTextLength
    }
  })

  const theme = useTheme()
  const [valueOption, setValueOption] = useState('DOWNLOAD')
  const { t, i18n } = useTranslation()

  const downloadOptions = (value) => {
    /**
     * Export PDF
     */
    if (value === 'ANALYTICS_REPORT' && mapLayersData.length > 0) {
      // Translate all necesary objects
      const objsForPlottingTranslated = objTranslation(t, objsForPlotting)

      const boundaryProperties = mapLayersData[0].properties

      exportPDF({
        boundaryProperties,
        objsForPlottingTranslated,
        adminLevel,
        allLayers,
        language: i18n.language
      })
    }
    /**
     * Expoer Map PNG
     */
    if (value === 'MAP' && mapLayersData.length > 0) {
      const boundaryProperties = mapLayersData[0].properties
      exportMapPNG({ boundaryProperties, adminLevel })
    }
    /**
     * Export CSV
     */
    if (value === 'AREA_OF_INTEREST' && mapLayersData.length > 0) {
      const boundaryProperties = mapLayersData[0].properties
      const objsForPlottingTranslated = objTranslation(t, objsForPlotting)

      exportCSV({ objsForPlottingTranslated, boundaryProperties, adminLevel })
    }
  }
  const shapename =
    mapLayersData && mapLayersData.length > 0
      ? mapLayersData[0].properties.shapename
      : null
  return (
    <AnalyticsContainer>
      <AnalyticsHeaderContainer>
        <label>{t('explore:analytics')}</label>
        {shapename ? (
          <span>
            {`${shapename}`}
            <small>{`(${adminLevel})`.toUpperCase()}</small>
          </span>
        ) : null}
      </AnalyticsHeaderContainer>
      <ScrollContainer>
        {objsForPlotting.map((plot, k) => {
          // check if UI control is visible or not
          const displayChart = Object.values(stateUIControls).filter(
            (ctrl) => ctrl.visibility && ctrl.chartsIds.includes(plot.key)
          )
          return displayChart.length > 0 ? (
            <AnalyticsPlot key={plot.key} plot={plot} />
          ) : (
            <></>
          )
        })}
      </ScrollContainer>
      <AnalyticsDownloadContainer>
        <ListboxInputStyled
          value={valueOption}
          onChange={(value) => setValueOption(value)}
          selected
        >
          <ListboxButtonStyled
            arrow={<ChevronDown color={theme.colors.text_selected_secondary} />}
          />
          <ListboxPopover>
            <ListboxList>
              {buttomOptions.map((v, i) => (
                <CustomListboxOption
                  key={`list-box-${i}`}
                  value={v.value}
                  onClick={() => downloadOptions(v.value)}
                >
                  {t(`explore:${v.text}`)}
                  <span>{t(`explore:${v.type}`)}</span>
                </CustomListboxOption>
              ))}
            </ListboxList>
          </ListboxPopover>
        </ListboxInputStyled>
      </AnalyticsDownloadContainer>
    </AnalyticsContainer>
  )
}
Analytics.propTypes = {
  mapLayersData: PropTypes.array,
  allLayers: PropTypes.array.isRequired,
  adminLevel: PropTypes.string.isRequired,
  stateUIControls: PropTypes.object.isRequired
}

export default Analytics
