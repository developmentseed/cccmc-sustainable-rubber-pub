import React from 'react'
import PropTypes from 'prop-types'
import { AccordionButton, AccordionItem } from '@reach/accordion'
import '@reach/accordion/styles.css'
import '@reach/tooltip/styles.css'
import styled from 'styled-components'
import Switch from 'react-switch'
import { useTranslation } from 'react-i18next'

import {
  ToggleButton,
  FirstLevelHeader,
  FirstLevelHeading
} from './LayerControlFirstLevelPanel'

const SwitchButton = styled(Switch)``
const AccordionItemCustom = styled(AccordionItem)`
  visibility: ${({ hasSelectedLayers, menuVisibility, theme }) =>
    menuVisibility};
  height: ${({ hasSelectedLayers, menuVisibility, theme }) =>
    menuVisibility === 'hidden' ? '0px' : 'auto'};
`
export default function LayerControlToggleButton ({
  label,
  icon: Icon,
  description,
  controls,
  uiState,
  toggleLayer,
  menuVisibility
}) {
  // Get if layer is vicible or not
  const layerId = controls[0].id
  const visibility = uiState[layerId] ? uiState[layerId].visibility : false
  const { t } = useTranslation()

  return (
    <AccordionItemCustom menuVisibility={menuVisibility}>
      <FirstLevelHeader hasSelectedLayers={visibility}>
        <ToggleButton as={AccordionButton}>
          <div>
            <FirstLevelHeading>
              <h3>{t(`explore:${label}`)}</h3>
            </FirstLevelHeading>
          </div>
        </ToggleButton>
        <SwitchButton
          onChange={() => {
            toggleLayer(layerId)
          }}
          checked={visibility}
          className='react-switch'
          onColor='#1D67C2'
          // onHandleColor="#2161c5"
          handleDiameter={10}
          uncheckedIcon={false}
          checkedIcon
          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
          height={18}
          width={30}
        />
      </FirstLevelHeader>
    </AccordionItemCustom>
  )
}

LayerControlToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired, // actually, this is a react component
  description: PropTypes.string.isRequired,
  controls: PropTypes.array.isRequired,
  uiState: PropTypes.object.isRequired,
  toggleLayer: PropTypes.func.isRequired,
  menuVisibility: PropTypes.string.isRequired
}
