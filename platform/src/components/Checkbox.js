import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'

import { themeVal } from '../utils/utils'
import Tick from '../icons/Tick'

const IconContainer = styled.div`
  visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  clip-path: inset(50%);
`

const StyledCheckbox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background-color: ${themeVal('colors.background')};
  border: 1px solid
    ${({ checked, theme }) =>
    checked ? theme.colors.primary : theme.colors.accent};
  border-radius: 4px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${({ theme }) => `0 0 0 2px ${theme.colors.primary}`};
  }

  ${IconContainer} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
    margin: auto auto;
  }
`

function Checkbox ({ className, checked, ...props }) {
  const theme = useTheme()
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <IconContainer>
          <Tick color={theme.colors.primary} />
        </IconContainer>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired
}
