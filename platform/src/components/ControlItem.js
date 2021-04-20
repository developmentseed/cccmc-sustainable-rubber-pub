import React from 'react'
import PropTypes from 'prop-types'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import styled from 'styled-components'
import numeral from 'numeral'

import Checkbox from './Checkbox'
import InfoButton from './InfoButton'
import { themeVal } from '../utils/utils'

const ControlItemContainer = styled.label`
  color: ${themeVal('colors.text_variant')};
  font-size: ${themeVal('fontSizes.small_text')}px;
  font-weight: ${themeVal('fontWeights.body')};

  background-color: ${themeVal('colors.background')};

  display: grid;
  grid-template-columns: auto 1fr auto 16px;
  align-items: center;
  margin-bottom: ${themeVal('space.s4')}px;
  > span {
    margin-left: ${themeVal('space.s4')}px;
    color: ${themeVal('colors.text_variant')};
  }
`

const SliderContainer = styled.div`
  padding: ${themeVal('space.s16')};
  background-color: ${themeVal('colors.muted')};

  /* The following uses the class names of the react-input-range
   * components to overwrite their styles:
   */
  .input-range__track--background {
    background: ${themeVal('colors.muted')};
  }

  .input-range__slider {
    background: ${themeVal('colors.primary')};
    border: 0;
    border-radius: 0;
    height: 12px;
    margin-left: -4px;
    margin-top: -12px;
    width: 8px;

    &::before {
      border-bottom: 8px solid ${themeVal('colors.primary')};
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      top: -8px;
    }
  }

  .input-range__label--value {
    top: -40px;
  }

  .input-range__label--min,
  .input-range__label--max {
    bottom: -16px;
  }
`
const Gradient = styled.div`
  height: 18px;
  width: 100%;
  background: ${themeVal('colors.muted')};
  background: ${({ theme }) => `linear-gradient(
    90deg,
    ${theme.colors.background} 0%,
    ${theme.colors.primary} 100%
  )`};
  opacity: 0.5;
  margin-bottom: -6px;
`

const NoInputRange = ({ minValue, maxValue }) => (
  <div className='input-range__label' style={{ marginTop: `16px` }}>
    <span className='input-range__label--min'>
      {numeral(minValue).format('0a')}
    </span>
    <span className='input-range__label--max'>
      {numeral(maxValue).format('0a')}
    </span>
  </div>
)

NoInputRange.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired
}

export default function ControlItem ({
  id,
  label,
  info,
  legend,
  controlState,
  toggleLayer,
  changeSlider
}) {
  const isChecked = !!controlState.visibility
  const canBeFiltered = !!controlState.range

  return (
    <>
      <ControlItemContainer htmlFor={id}>
        <Checkbox
          id={id}
          onChange={() => toggleLayer(id)}
          checked={isChecked}
        />
        <span>{label}</span>
        {/* {isChecked && legend.type === 'dot' && <Dot color={legend.color} />}
        {isChecked && legend.type === 'line' && <Line color={legend.color} />} */}

        {info && (
          <InfoButton info={info} aria-label={`info about ${label} layer`} />
        )}
      </ControlItemContainer>
      {isChecked && legend.type === 'gradient' && (
        <SliderContainer>
          <Gradient />
          {canBeFiltered ? (
            <InputRange
              minValue={legend.domain[0]}
              maxValue={legend.domain[1]}
              formatLabel={(number) =>
                `${numeral(number).format('0a')}${
                  legend.unit ? legend.unit : ''
                }`
              }
              step={1}
              value={controlState.range}
              onChange={(value) =>
                changeSlider({ controlId: id, range: value })
              }
            />
          ) : (
            <NoInputRange
              minValue={legend.domain[0]}
              maxValue={legend.domain[1]}
            />
          )}
        </SliderContainer>
      )}
    </>
  )
}

ControlItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  legend: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      color: PropTypes.string,
      unit: PropTypes.string,
      domain: PropTypes.arrayOf(PropTypes.number)
    }).isRequired,
    PropTypes.oneOf(['none']).isRequired
  ]).isRequired,
  controlState: PropTypes.object.isRequired,
  toggleLayer: PropTypes.func.isRequired,
  changeSlider: PropTypes.func.isRequired
}
