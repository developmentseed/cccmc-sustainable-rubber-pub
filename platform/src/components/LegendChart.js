import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { themeVal, fixValue } from '../utils/utils'

const CustomLegendWrap = styled.ul`
  padding: 0px;
  margin: 0px;
`
const ControlItemContainer = styled.li`
  color: ${themeVal('colors.text_variant')};
  font-size: ${themeVal('fontSizes.small_text')}px;
  font-weight: ${themeVal('fontWeights.body')};
  display: grid;
  grid-template-columns: auto 1fr auto 16px;
  align-items: center;
  > label {
    margin-left: ${themeVal('space.s8')}px;
    color: ${themeVal('colors.text_variant')};
  }
  > span {
    margin-left: ${themeVal('space.s8')}px;
    color: ${themeVal('colors.text')};
    font-weight: ${themeVal('fontWeights.bold')};
  }
`

const ColorContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: ${themeVal('space.s24')}px;
  height: ${themeVal('space.s8')}px;
  background-color: ${({ color }) => color};
`

export default function LegendChart ({ customData, customColor }) {
  if (!customData) return null
  const { t } = useTranslation()

  return (
    <CustomLegendWrap>
      {customData.map((entry, index) => (
        <ControlItemContainer key={`item-${index}`}>
          <ColorContainer color={customColor || entry.fill} />
          <label>{t(`explore:${entry.name}`)}</label>
          <span>{fixValue(entry.val)}</span>
        </ControlItemContainer>
      ))}
    </CustomLegendWrap>
  )
}

LegendChart.propTypes = {
  props: PropTypes.object.isRequired
}
