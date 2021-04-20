import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'

import { themeVal } from '../utils/utils'
import ChartBar from './ChartBar'
import ChartLine from './ChartLine'
import ChartNumeric from './ChartNumeric'
import { useTranslation } from 'react-i18next'

const PlotContainer = styled.div`
  padding: ${themeVal('space.s16')}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${themeVal('colors.background')};
  margin: ${themeVal('space.s8')}px ${themeVal('space.s0')}px;
  border-radius: ${themeVal('borderRadius')}px;
  > p {
    width: 100%;
    word-wrap: anywhere;
    display: inline-block;
    padding: 0px;
  }
  > span {
    color: ${({ type }) =>
    type === 'numChart'
      ? themeVal('colors.chart_header_off')
      : themeVal('colors.text')};

    font-weight: ${themeVal('fontWeights.heading')};

    font-size: ${({ type }) =>
    type === 'numChart'
      ? themeVal('fontSizes.small_text')
      : themeVal('fontSizes.small_title')}px;
    margin-bottom: ${themeVal('space.s4')}px;
  }
`

const AnalyticsPlot = ({ plot }) => {
  const { title, type, data } = plot
  if (!data) return null
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <PlotContainer type={type}>
      <span>{t(`explore:${title}`)}</span>
      {type === 'barChart' ? (
        <div>
          <ChartBar
            id={plot.key}
            data={data}
            isVisible
            width={theme.chart.svg_width}
            height={theme.chart.svg_height}
            config={plot}
          />
          <ChartBar
            id={`pdf_${plot.key}`}
            data={data}
            isVisible={false}
            width={theme.chart.svg_pdf_width}
            height={theme.chart.svg_pdf_height}
            config={plot}
          />
        </div>
      ) : plot.type === 'lineChart' ? (
        <div>
          <ChartLine
            id={plot.key}
            data={data}
            isVisible
            width={theme.chart.svg_width}
            height={theme.chart.svg_height}
            config={plot}
          />
          <ChartLine
            id={`pdf_${plot.key}`}
            data={data}
            isVisible={false}
            width={theme.chart.svg_pdf_width}
            height={theme.chart.svg_pdf_height}
            config={plot}
          />
        </div>
      ) : plot.type === 'numChart' ? (
        <ChartNumeric data={data} config={plot} />
      ) : (
        <></>
      )}
    </PlotContainer>
  )
}

AnalyticsPlot.propTypes = {
  plot: PropTypes.object.isRequired
}

export default AnalyticsPlot
