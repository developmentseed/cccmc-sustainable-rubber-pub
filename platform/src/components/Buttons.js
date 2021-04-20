import styled, { css } from 'styled-components'
import { themeVal } from '../utils/utils'

export const PrimaryButtonCSS = css`
  cursor: ${({ selected }) => (selected ? `default` : `pointer`)};
  text-decoration: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding: ${themeVal('space.s0')}px ${themeVal('space.s0')}px;
  font-family: ${themeVal('fonts.body')};

  border-style: solid;
  border-width: 0px;
  border-radius: ${themeVal('borderRadius')}px;

  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.muted};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.background : theme.colors.offtext};
  font-size: ${themeVal('fontSizes.small_text')}px;
  font-weight: ${themeVal('fontWeights.heading')};
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  line-height: ${({ height }) => (height ? `${height}px` : 'auto')};
  letter-spacing: 0;
`

export const SecondaryButtonCSS = css`
  ${PrimaryButtonCSS}
  background-color:   ${({ theme, selected }) =>
    selected ? theme.colors.primary_variant : theme.colors.muted};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.offtext};
  font-size: ${themeVal('fontSizes.small_text')}px;
  text-transform: uppercase;
`

export const Divider = styled.div`
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${themeVal('colors.accent')};
`

export const PrimaryButton = styled.button`
  ${PrimaryButtonCSS}
`

export const SecondaryButton = styled(PrimaryButton)`
  ${SecondaryButtonCSS}
`
