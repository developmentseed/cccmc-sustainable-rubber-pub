import React from 'react'
import styled from 'styled-components'

import { themeVal } from '../utils/utils'
import MapboxControl from './Map.MapboxControl'
import { Layers as LayersIco } from '../icons'

export const ToggleButtonLayer = styled.button`
  width: 29px;
  height: 29px;
  display: inline-flex;
  padding: 0;
  outline: none;
  border: 0;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  font-family: ${themeVal('fonts.body')}px;

  > span {
    margin: 0px;
    padding: 0px;
    width: 29px;
    height: 29px;
  }
  > div {
    display: none;
    align-items: center;
    margin: auto 0;
  }
  &: hover {
    width: 230px;
    height: 29px;
    background: ${themeVal('colors.background')};
    > div {
      display: inline-flex;
    }
  }
`
const CustomCrtlLayerToggleWrap = styled.div`
  height: 29px;
  right: 0px;
  background: ${themeVal('colors.background')};
  box-shadow: 0 0 0 2px rgb(0 0 0 / 10%);
  border-radius: ${themeVal('borderRadius')}px;
`
// switch
const SwitchWrap = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 18px;
  > input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }

  > span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 25px;
    background-color: ${themeVal('colors.primary_variant')};
    &:before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 0px;
      bottom: 0px;
      background-color: ${themeVal('colors.offtext')};
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
  input:checked + span {
    background-color: ${themeVal('colors.text_selected_secondary')};
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`
const SwitchLabel = styled.label`
  margin-left: 10px;
`

const LayerDropdownControl = new MapboxControl(
  ({ checkMap, theme, setCheckMap, checkMaplayer }) => {
    return (
      <div>
        <CustomCrtlLayerToggleWrap theme={theme}>
          <ToggleButtonLayer theme={theme}>
            <span role='img' aria-label='layers'>
              <LayersIco color={theme.colors.text} />
            </span>
            <div>
              <SwitchWrap theme={theme}>
                <input
                  type='checkbox'
                  checked={checkMap}
                  onChange={() => {
                    setCheckMap(!checkMap)
                  }}
                />
                <span />
              </SwitchWrap>
              <SwitchLabel>{checkMaplayer}</SwitchLabel>
            </div>
          </ToggleButtonLayer>
        </CustomCrtlLayerToggleWrap>
      </div>
    )
  }
)
export default LayerDropdownControl
