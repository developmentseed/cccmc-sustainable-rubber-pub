import React from 'react'
import PropTypes from 'prop-types'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Legend,
  ResponsiveContainer
} from 'recharts'
import styled from 'styled-components'

import CustomTooltip from './CustomToolTip'
import LegendChart from './LegendChart'
import { dataFormater } from './../utils/utils'
import { useTranslation } from 'react-i18next'

const ResponsiveContainerCustom = styled(ResponsiveContainer)`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  position: ${({ isVisible }) => (isVisible ? 'none' : 'absolute')};
  left: ${({ isVisible }) => (isVisible ? '0' : '-999em')};
`

const ChartBar = ({ id, data, isVisible, width, height, config }) => {
  if (config.hiddeZero) {
    data = (data || []).filter((key) => ![null, undefined, 0].includes(key.val))
  }
  height = height + 24 * data.length + 10
  const { t } = useTranslation()

  // translate data
  data = data.map((i) => ({ ...i, name: t(`explore:${i.name}`) }))
  return (
    <ResponsiveContainerCustom
      width={width}
      height={height}
      isVisible={isVisible}
    >
      <BarChart
        id={id}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          style={{ fontSize: 10 }}
          angle={config.legendTextLength >= 20 ? -45 : 0}
          textAnchor={config.legendTextLength >= 20 ? 'end' : 'middle'}
          interval={0}
          height={config.legendTextLength >= 20 ? config.legendTextLength * 4 : 30}
        />
        <YAxis
          width={35}
          tickFormatter={dataFormater}
          padding={{ left: -30, top: 25 }}
          style={{ fontSize: 10 }}
        >
          <Label position='insideTopLeft' style={{ fontSize: 10 }}>
            {t(`explore:${config.unit}`)}
          </Label>
        </YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='val' unit={t(`explore:${config.unit}`)} />
        <Legend content={LegendChart} customData={data} />
      </BarChart>
    </ResponsiveContainerCustom>
  )
}

ChartBar.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default ChartBar
