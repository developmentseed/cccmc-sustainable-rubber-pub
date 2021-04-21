import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Accordion } from '@reach/accordion'
import '@reach/accordion/styles.css'
import '@reach/tooltip/styles.css'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import FirstLevelPanel from './LayerControlFirstLevelPanel'
import LayerControlToggleButton from './LayerControlToggleButton'
import { themeVal } from '../utils/utils'

const LayerControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: ${themeVal('colors.background_variant')};
  > span {
    font-size: ${themeVal('fontSizes.small_title')}px;
    font-weight: ${themeVal('fontWeights.bold')};
    letter-spacing: 0;
    line-height: 24px;
  }
`
export default function LayerControl ({
  uiState,
  uicontrols,
  toggleLayer,
  changeSlider
}) {
  // need to update here, this open the tabs
  const [indices, setIndices] = useState([])

  function toggleAccordionItem (toggledIndex) {
    if (indices.includes(toggledIndex)) {
      setIndices(
        indices.filter((currentIndex) => currentIndex !== toggledIndex)
      )
    } else {
      if (indices.length > 0) {
        setIndices([indices[indices.length - 1], toggledIndex])
      } else setIndices([toggledIndex])
    }
  }
  const { t } = useTranslation()
  return (
    <Accordion index={indices} onChange={toggleAccordionItem}>
      <LayerControlContainer>
        <span>{t('explore:layers')}</span>
        {uicontrols.map((group, index) => {
          return group.toggleButton && group.controls.length === 1 ? (
            <LayerControlToggleButton
              key={index}
              label={group.label}
              icon={group.icon}
              description={group.description}
              controls={group.controls}
              uiState={uiState}
              toggleLayer={toggleLayer}
              menuVisibility={
                group.menuVisibility ? group.menuVisibility : 'visible'
              }
            />
          ) : (
            <FirstLevelPanel
              key={index}
              label={group.label}
              icon={group.icon}
              description={group.description}
              controls={group.controls}
              indices={indices}
              index={index}
              uiState={uiState}
              toggleLayer={toggleLayer}
              changeSlider={changeSlider}
            />
          )
        })}
      </LayerControlContainer>
    </Accordion>
  )
}

LayerControl.propTypes = {
  uiState: PropTypes.object.isRequired,
  uicontrols: PropTypes.array.isRequired,
  toggleLayer: PropTypes.func.isRequired,
  changeSlider: PropTypes.func.isRequired
}
