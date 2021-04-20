import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@reach/accordion'
import '@reach/accordion/styles.css'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@reach/disclosure'
import '@reach/tooltip/styles.css'
import styled, { ThemeContext } from 'styled-components'
import { useTranslation } from 'react-i18next'

import ControlItem from './ControlItem'
import InfoButton from './InfoButton'
import { Plus, Minus } from '../icons'
import { themeVal } from '../utils/utils'

export const ToggleButton = styled.button`
  appearance: none;
  background: ${themeVal('colors.background')};
  border: 0;
  padding: 0;
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${themeVal('space.s16')}px;
  width: fit-content;
  > div {
    display: inline-flex;
    gap: ${themeVal('space.s16')}px;
    align-items: center;
    flex: 5;
  }

  .secondDiv {
    flex: 3;

    > label {
      font-family: ${themeVal('fonts.heading')};
      font-size: ${themeVal('fontSizes.x_small_text')}px;
      text-align: left;
      color: ${themeVal('colors.title_container')};
    }
    > span {
      margin-left: auto;
    }
  }
  outline: none;
`

export const FirstLevelHeader = styled.div`
  align-items: center;
  padding: ${themeVal('space.s16')}px;
  display: flex;

  border-bottom: ${({ isOpen, theme }) =>
    !isOpen ? 0 : `1px solid ${theme.colors.border}`};
  background: ${themeVal('colors.background')};
  border-radius: 2px;
`

export const FirstLevelHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  h3 {
    margin: 0;
    color: ${themeVal('colors.text')};
    font-weight: ${themeVal('fontWeights.bold')};
    text-align: start;
    letter-spacing: 0;
    line-height: 24px;
  }

  p {
    margin: 0;
    color: ${themeVal('colors.text')};
    font-size: ${themeVal('fontSizes.small_body_text')}px;
    font-weight: ${themeVal('fontWeights.body')};
    text-align: start;
  }
`
const AccordionItemWrap = styled(AccordionItem)`
  margin: 5px 0px 8px 0px;
`

export const Panel = styled.div`
  background: ${themeVal('colors.background')};
  padding: ${themeVal('space.s16')}px;
  &:focus {
    outline: none;
  }
`

export default function FirstLevelPanel ({
  label,
  icon: Icon,
  description,
  controls,
  indices,
  index,
  uiState,
  toggleLayer,
  changeSlider
}) {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()
  const controlsId = (controls || []).map((i) => i.id)
  const statesCounf = Object.entries(uiState).filter(
    (key) => controlsId.includes(key[0]) && key[1].visibility
  ).length

  return (
    <AccordionItemWrap>
      <FirstLevelHeader
        isOpen={indices.includes(index)}
        // hasSelectedLayers
      >
        <ToggleButton as={AccordionButton}>
          <div>
            {/* <IconContainer hasSelectedLayers={hasSelectedLayers}>
              <Icon
                color={
                  hasSelectedLayers
                    ? theme.colors.highlight
                    : theme.colors.primary
                }
              />
            </IconContainer> */}
            <FirstLevelHeading>
              <h3>{t(`explore:${label}`)}</h3>
              <p>{t(`explore:${description}`)}</p>
            </FirstLevelHeading>
          </div>
          <div className='secondDiv'>
            {statesCounf !== 0 ? (
              <label>{`(${statesCounf} ${t('explore:activeLayers')})`}</label>
            ) : null}

            {indices.includes(index) ? (
              <span role='img' aria-label='chevron up'>
                <Minus color={theme.colors.text} />
              </span>
            ) : (
              <span role='img' aria-label='chevron down'>
                <Plus color={theme.colors.text} />
              </span>
            )}
          </div>
        </ToggleButton>
      </FirstLevelHeader>
      <Panel as={AccordionPanel}>
        {controls.map((control) => {
          if (control.subcontrols) {
            return (
              <SecondLevelPanel
                key={control.id}
                label={t(`explore:${control.label}`)}
                info={t(`explore:${control.info}`)}
                controls={control.subcontrols}
                uiState={uiState}
                toggleLayer={toggleLayer}
                changeSlider={changeSlider}
              />
            )
          }

          return uiState[control.id] ? (
            <ControlItem
              key={control.id}
              id={control.id}
              label={t(`explore:${control.label}`)}
              info={t(`explore:${control.info}`)}
              legend={control.legend}
              controlState={uiState[control.id]}
              toggleLayer={toggleLayer}
              changeSlider={changeSlider}
            />
          ) : null
        })}
      </Panel>
    </AccordionItemWrap>
  )
}

FirstLevelPanel.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired, // actually, this is a react component
  description: PropTypes.string.isRequired,
  controls: PropTypes.array.isRequired,
  indices: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  uiState: PropTypes.object.isRequired,
  toggleLayer: PropTypes.func.isRequired,
  changeSlider: PropTypes.func.isRequired
}

const SecondLevelHeader = styled(FirstLevelHeader)`
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  border-bottom: ${(props) =>
    props.isOpen ? `1px solid ${({ theme }) => theme.colors.background}` : 0};
  background-color: ${({ theme }) => theme.colors.muted};
`

const SecondLevelHeading = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[0]}pt;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  #text-transform: uppercase;
  margin: 0;
`

function SecondLevelPanel ({
  label,
  info,
  controls,
  uiState,
  toggleLayer,
  changeSlider
}) {
  const theme = useContext(ThemeContext)
  const [isOpen, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <Disclosure open={isOpen} onChange={() => setOpen(!isOpen)}>
      <SecondLevelHeader isOpen={isOpen}>
        <ToggleButton as={DisclosureButton}>
          <SecondLevelHeading>{t(`explore:${label}`)}</SecondLevelHeading>
          <div>
            {info && (
              <InfoButton
                as='div' // as div: <button> cannot appear as a descendant of <button>
                info={t(`explore:${info}`)}
                aria-label={`info about ${label} layers`}
              />
            )}

            {isOpen ? (
              <span role='img' aria-label='minus'>
                <Minus color={theme.colors.primary} />
              </span>
            ) : (
              <span role='img' aria-label='plus'>
                <Plus color={theme.colors.primary} />
              </span>
            )}
          </div>
        </ToggleButton>
      </SecondLevelHeader>
      <Panel as={DisclosurePanel}>
        {controls.map((control) =>
          uiState[control.id] ? (
            <ControlItem
              key={control.id}
              id={control.id}
              label={t(`explore:${control.label}`)}
              info={t(`explore:${control.info}`)}
              legend={control.legend}
              controlState={uiState[control.id]}
              toggleLayer={toggleLayer}
              changeSlider={changeSlider}
            />
          ) : (
            <></>
          )
        )}
      </Panel>
    </Disclosure>
  )
}

SecondLevelPanel.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  controls: PropTypes.array.isRequired,
  uiState: PropTypes.object.isRequired,
  toggleLayer: PropTypes.func.isRequired,
  changeSlider: PropTypes.func.isRequired
}
