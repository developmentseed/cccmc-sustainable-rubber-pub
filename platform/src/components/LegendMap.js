import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@reach/accordion'
import '@reach/accordion/styles.css'

import { ToggleButton, FirstLevelHeading } from './LayerControlFirstLevelPanel'
import { themeVal } from '../utils/utils'
import { Plus, Minus } from './../icons'

const CustomAccordionItem = styled(AccordionItem)`
  background: ${themeVal('colors.background')};
  margin: ${themeVal('space.s0')}px 0px;
  display: inline;
  flex-direction: row;
`
const LegendMapContainer = styled.div`
  padding: ${themeVal('space.s0')}px;
  background: ${themeVal('colors.background')};
  line-height: 18px;
  margin-bottom: ${themeVal('space.s0')}px;
  width: ${themeVal('space.s210')}px;
  position: absolute;
  bottom: 0px;
  z-index: 2;
  right: ${themeVal('space.s16')}px;
  border-radius: 2px;
  overflow-y: hidden;
  max-height: 344px;
`
const CustomAccordionPanel = styled(AccordionPanel)`
  max-height: ${themeVal('space.s300')}px;
`
const CustomAccordionWrapPanel = styled.div`
  display: flex;
  flex-direction: column;
  max-height: inherit;
`
const FirstLevelHeader = styled.div`
  align-items: center;
  padding: ${themeVal('space.s8')}px ${themeVal('space.s16')}px;
  display: flex;

  border-bottom: ${({ isOpen, theme }) =>
    !isOpen ? 0 : `1px solid ${theme.colors.border}`};
  background: ${themeVal('colors.background')};
  border-radius: 2px;
`
const ControlRotContainer = styled.div`
  display: flex;
  flex-direction: column;
  > h4 {
    margin: 0 ${themeVal('space.s16')}px ${themeVal('space.s8')}px
      ${themeVal('space.s16')}px;
    font-size: ${themeVal('fontSizes.small_text')}px;
    font-weight: ${themeVal('fontWeights.heading')};
  }
`
const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  max-height: inherit;
  border-top: 1px solid ${themeVal('colors.accent')};
  padding: ${themeVal('space.s16')}px 0;
`

const ControlItemContainer = styled.label`
  color: ${themeVal('colors.text_variant')};
  font-size: ${themeVal('fontSizes.small_text')}px;
  font-weight: ${themeVal('fontWeights.body')};

  display: grid;
  grid-template-columns: auto 1fr auto 16px;
  align-items: center;
  margin-bottom: ${themeVal('space.s4')}px;
  > span {
    margin-left: ${themeVal('space.s8')}px;
    color: ${themeVal('colors.text_variant')};
  }
`
const ColorContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  height: ${themeVal('space.s24')}px;
  width: ${themeVal('space.s8')}px;
  background-color: ${({ color }) => color};
`
function legendRown ({ label, legend }, key) {
  if (!legend || !legend.length > 0) return null
  return (
    <ControlRotContainer key={key}>
      <h4>{label}</h4>
      {legend.map((v, k) => (
        <ControlItemContainer key={k}>
          <ColorContainer color={v.color} />
          <span>{v.value}</span>
        </ControlItemContainer>
      ))}
    </ControlRotContainer>
  )
}
function CustomAccordionPanelBody ({ legendMapData }) {
  const { t } = useTranslation()

  if (legendMapData.length === 0) {
    return (
      <CustomAccordionPanel>
        <CustomAccordionWrapPanel>
          <ScrollContainer>
            <h4>{t('explore:noData')}</h4>
          </ScrollContainer>
        </CustomAccordionWrapPanel>
      </CustomAccordionPanel>
    )
  }
  return (
    <CustomAccordionPanel>
      <CustomAccordionWrapPanel>
        <ScrollContainer>
          {legendMapData.map((legend, k) => legendRown(legend, k))}
        </ScrollContainer>
      </CustomAccordionWrapPanel>
    </CustomAccordionPanel>
  )
}
export default function LegendMap ({ stateUIControls }) {
  const theme = useTheme()
  const [indices, setIndices] = useState([])
  function toggleAccordionItem (toggledIndex) {
    indices.includes(toggledIndex) ? setIndices([]) : setIndices([toggledIndex])
  }
  const { t } = useTranslation()

  let legendMapData = []
  if (stateUIControls instanceof Object) {
    Object.entries(stateUIControls).forEach((item) => {
      const value = item[1]
      if (value.visibility && (value.legendMap || []).length > 0) {
        legendMapData.push({
          label: t(`explore:${value.label}`),
          legend: value.legendMap.map((i) => ({
            ...i,
            value: t(`explore:${i.value}`)
          }))
        })
      }
    })
  }

  return (
    <LegendMapContainer>
      <Accordion index={indices} onChange={toggleAccordionItem}>
        <CustomAccordionItem>
          <FirstLevelHeader isOpen={indices.includes(0)}>
            <ToggleButton as={AccordionButton}>
              <FirstLevelHeading>
                <h3>{t('explore:legend')}</h3>
              </FirstLevelHeading>
              {indices.includes(0) ? (
                <span role='img' aria-label='chevron up'>
                  <Minus color={theme.colors.text} />
                </span>
              ) : (
                <span role='img' aria-label='chevron down'>
                  <Plus color={theme.colors.text} />
                </span>
              )}
            </ToggleButton>
          </FirstLevelHeader>
          <CustomAccordionPanelBody legendMapData={legendMapData} />
        </CustomAccordionItem>
      </Accordion>
    </LegendMapContainer>
  )
}

LegendMap.propTypes = {
  stateUIControls: PropTypes.object.isRequired
}
