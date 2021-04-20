import PropTypes from 'prop-types'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import ReactMarkdownWithHtml from 'react-markdown/with-html'
import { useTranslation } from 'react-i18next'
import gfm from 'remark-gfm'

import { themeVal } from '../utils/utils'
import PageLayout, {
  InfoBlock,
  Tagline,
  PageTitle,
  Paragraph
} from '../components/PageLayout'

const MarkdownContainer = styled.div`
  padding: ${themeVal('space.s16')}px;
  font-size: ${themeVal('fontSizes.small_body_text')}px;

  > p {
    font-size: ${themeVal('fontSizes.small_body_text')}px;
  }
`
export default function Info ({ siteAcronym }) {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <PageLayout siteAcronym={siteAcronym} theme={theme}>
      <InfoBlock>
        <Tagline>{t('info:about')}</Tagline>
        <PageTitle>{t('info:theTool')}</PageTitle>
        <Paragraph as='div'>
          <MarkdownContainer>
            <ReactMarkdownWithHtml
              plugins={[gfm]}
              children={t('info:infoBody')}
              allowDangerousHtml
            />
          </MarkdownContainer>
        </Paragraph>
        {/* TODO: Add point of contact  */}
      </InfoBlock>

      {/* <Logo withTagline />

      <PartnersBlock>
        <Paragraph as='div'>
          In partnership with <Credits />
        </Paragraph>
      </PartnersBlock> */}
    </PageLayout>
  )
}

Info.propTypes = {
  siteAcronym: PropTypes.string.isRequired
}
