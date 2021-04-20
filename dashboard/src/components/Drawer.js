import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'

import { ArrowLoop } from '../icons'
import Header from './Header'
import AdminSelector from './AdminSelector'
import { SecondaryButton } from '../components/Buttons'
import { themeVal } from '../utils/utils'

const Container = styled.section`
  @media (min-width: 720px) {
    grid-column: 1 / span 3;
    grid-row: 1 / span all;
  }

  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.24);
  border-radius: 0.25rem;

  display: flex;
  flex-direction: column;
  background-color: ${themeVal('colors.background')};
  border: 1px solid rgba(0, 0, 0, 0.1);
`

const ScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  border-top: ${themeVal('colors.accent')};
  background-color: ${themeVal('colors.background_variant')};
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: ${themeVal('space.s16')}px;
  gap: ${themeVal('space.s8')}px;
`

const IconContainer = styled.span`
  margin-right:${themeVal('space.s8')}px;
}
`
export default function Drawer ({
  siteName,
  country,
  cc,
  clearAll,
  hasSelectedLayers,
  clearDatalayers,
  children
}) {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Container>
      <Header
        siteName={siteName}
        country={country}
        cc={cc}
        clearDatalayers={clearDatalayers}
      />
      <AdminSelector />
      <ScrollContainer>{children}</ScrollContainer>
      <Actions>
        <SecondaryButton
          onClick={clearAll}
          disabled={!hasSelectedLayers}
          data-cy='clear-button'
          selected
          height={40}
        >
          {/* TODO , fix icon  */}
          <IconContainer aria-hidden='true'>
            <ArrowLoop color={theme.colors.text_selected_secondary} />
          </IconContainer>
          {t('explore:resetLayer')}
        </SecondaryButton>
      </Actions>
    </Container>
  )
}

Drawer.propTypes = {
  siteName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  cc: PropTypes.string.isRequired,
  hasSelectedLayers: PropTypes.bool.isRequired,
  clearAll: PropTypes.func.isRequired,
  clearDatalayers: PropTypes.func.isRequired,
  children: PropTypes.element
}
