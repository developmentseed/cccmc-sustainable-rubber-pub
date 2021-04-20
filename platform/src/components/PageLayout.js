import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import NavigationBar from './NavigationBar'
import { themeVal } from '../utils/utils'
import CCCMC_LOGO from '../../img/CCCMC_LOGO.png'

const PageContainer = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background: ${themeVal('colors.background_variant')};
  outline: none;
`
// margin: ${({ noMargin }) => (noMargin ? 0 : `0 auto`)};
// padding: ${({ noMargin, theme }) =>
//   noMargin ? 0 : `${2 * theme.space[1]}px ${theme.space[5]}px`};

const MainContent = styled.main`
  width: 100%;
  display: grid;
  grid-template-rows: auto 500px auto;
  @media (min-width: 720px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
  }
  overflow: auto;
  outline: none;
`

export default function PageLayout ({ siteAcronym, noMargin, children }) {
  return (
    <PageContainer>
      <NavigationBar siteAcronym={siteAcronym} />
      <MainContent noMargin={noMargin} tabIndex='0'>
        {children}
      </MainContent>
    </PageContainer>
  )
}

PageLayout.propTypes = {
  siteAcronym: PropTypes.string.isRequired,
  noMargin: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export const Introduction = styled.div`
  grid-row: 2 / span 10;
  grid-column: 1 / span 6;
  margin-left: ${themeVal('space.s32')}px;

  display: flex;
  flex-direction: column;
`

export const InfoBlock = styled.div`
  grid-row: 2 / span 10;
  grid-column: 1 / span 11;
  margin-left: ${themeVal('space.s32')}px;
`

export const Tagline = styled.span`
  color: ${themeVal('colors.primary')};
  font-size: ${themeVal('fontSizes.small_body_text')}px;
  font-weight: ${themeVal('fontWeights.bold')};
  text-transform: uppercase;
  display: block;
  letter-spacing: 0;
  line-height: 24px;
`

export const PageTitle = styled.h1`
  margin-top: ${themeVal('space.s8')}px;
  line-height: 67.2px;
`

export const Paragraph = styled.p`
  font-weight: ${themeVal('fontWeights.body')};
  margin-top: ${themeVal('space.s8')}px;
  margin-bottom: ${themeVal('space.s16')}px;
  letter-spacing: 0;
  line-height: 25.2px;
`

const LogoContainer = styled.figure`
  grid-column: 1 / span 5;
  align-self: end;
  margin: 5;

  display: flex;
  flex-direction: column;
`

const Caption = styled.figcaption`
  color: ${themeVal('colors.primary')};
  font-family: ${themeVal('fonts.body')};
  font-size: ${themeVal('fontSizes.s32')}px;
  font-weight: ${themeVal('fontWeights.body')};
  text-transform: uppercase;

  margin: ${themeVal('space.s32')}px 0;
`

export const Logo = ({ withTagline }) => (
  <LogoContainer>
    {withTagline && <Caption>An Innovation Of</Caption>}
    <img alt='info' src={CCCMC_LOGO} width={400} />
  </LogoContainer>
)

Logo.propTypes = {
  withTagline: PropTypes.bool
}
