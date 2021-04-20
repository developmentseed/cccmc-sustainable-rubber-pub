import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { themeVal } from '../utils/utils'
import { useTranslation } from 'react-i18next'
import { formatThousands } from '../utils/format'

const NumberContainer = styled.div`
  color: ${themeVal('colors.text')};
  font-weight: ${themeVal('fontWeights.heading')};
  margin: 0;

  display: inline-flex;
  align-items: center;
  gap: ${themeVal('space.s4')}px;
  > h2 {
    margin: 0;
  }
`
const ChartNumber = ({ data, config }) => {
  const { t } = useTranslation()

  return (
    <NumberContainer>
      <h2>{formatThousands(data)}</h2> <span>{t(`explore:${config.unit}`)}</span>
    </NumberContainer>
  )
}

ChartNumber.propTypes = {
  data: PropTypes.number.isRequired
}

export default ChartNumber
