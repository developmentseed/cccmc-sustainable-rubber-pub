import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { themeVal, fixValue } from '../utils/utils'

const ToopTipWrap = styled.div`
  margin: ${themeVal('space.s0')};
  padding: ${themeVal('space.s8')}px;
  background-color: ${themeVal('colors.background')};
  border: 1px solid rgb(204, 204, 204);
  white-space: nowrap;
  > p {
    margin: ${themeVal('space.s0')};
    color: ${themeVal('colors.text')};
  }
  > ul {
    list-style: none;
    padding: ${themeVal('space.s0')};
    margin: ${themeVal('space.s0')};
    > li {
      display: block;
      padding: ${themeVal('space.s0')};
      color: ${themeVal('colors.text_variant')};
    }
  }
`
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { t } = useTranslation()

    return (
      <ToopTipWrap>
        <p>{t(`explore:${label}`)}</p>
        <ul>
          <li>
            <span>{fixValue(payload[0].value)}</span>{' '}
            <strong>{t(`explore:${payload[0].unit || ''}`)}</strong>
          </li>
        </ul>
      </ToopTipWrap>
    )
  }

  return null
}
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string
}

export default CustomTooltip
