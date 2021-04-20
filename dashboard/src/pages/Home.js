import PropTypes from 'prop-types'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import PageLayout, {
  Introduction,
  Tagline,
  PageTitle,
  Paragraph
} from '../components/PageLayout'
import Credits from '../components/Credits'
import { PrimaryButtonCSS, SecondaryButtonCSS } from '../components/Buttons'
import { themeVal } from '../utils/utils'
import Markdown from '../components/Markdown'

const Actions = styled.div`
  display: inline-flex;
  gap: ${themeVal('space.s16')}px;
  margin: ${themeVal('space.s32')}px 0;
`

const WrapParagraph = styled.div`
  flex-grow: 1;
`

const PartnersBlock = styled.div`
  grid-column: 1 / span 4;
`

const Image = styled.figure`
  grid-area: 1 / 7 / 12 / span 12;
  margin: 0px;
  height: 100vh;

  background-image: ${({ url }) => `url(${url})`};
  background-size: auto 100%;
  background-position: center;
  // clip-path: polygon(35% 0%, 115% 0%, 100% 100%, 35% 100%, 15% 60%);
  z-index: 2;
  background-repeat: no-repeat;
`
const PrimaryLink = styled(Link)`
  ${PrimaryButtonCSS}
  background-color: ${themeVal('colors.primary')};
  color: ${themeVal('colors.background')};
  font-size: ${themeVal('fontSizes.small_text')}px;
  text-transform: uppercase;
`
const SecondaryLink = styled(Link)`
  ${SecondaryButtonCSS}
  background-color: ${themeVal('colors.primary_variant')};
  color: ${themeVal('colors.primary')};
  font-size: ${themeVal('fontSizes.small_text')}px;
`

export default function Home ({ siteAcronym, siteName, imageUrl }) {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <PageLayout siteAcronym={siteAcronym} theme={theme}>
      {/* <Logo /> */}
      <Introduction>
        <Tagline>{t('home:welcomeToThe')}</Tagline>
        <PageTitle>{t('home:siteName')}</PageTitle>
        <WrapParagraph>
          {/* <Paragraph>{t('home:rubberRisk')}</Paragraph> */}
          <Paragraph>
            <Markdown text={t('home:rubberRisk')} />
          </Paragraph>
          <Paragraph>
            <Markdown
              text={t('home:asiaProduces')}
            />
          </Paragraph>
          <Actions>
            <SecondaryLink
              to='/info'
              aria-label={t('home:readSomeMore')}
              data-cy='info-button'
              width={180}
              height={48}
            >
              {t('home:learnMore')}
            </SecondaryLink>
            <PrimaryLink
              to='/explore'
              aria-label={t('home:exploreTheMap')}
              data-cy='explore-button'
              width={180}
              height={48}
            >
              {t('home:startExploring')}
            </PrimaryLink>
          </Actions>
        </WrapParagraph>
        <PartnersBlock>
          <Tagline>{t('home:partners')}</Tagline>
          <Credits />
        </PartnersBlock>
      </Introduction>
      <Image url={imageUrl} />
    </PageLayout>
  )
}

Home.propTypes = {
  siteAcronym: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
}
