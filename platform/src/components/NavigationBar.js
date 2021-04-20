import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { v1 as uuidv1 } from 'uuid'

import { Home, Explore, Info, DataInfo, Message } from '../icons'
import { themeVal } from '../utils/utils'
import { SecondaryButton } from '../components/Buttons'
import { ConfigContext } from '../contexts/ConfigContext'
import FeedBackModal from '../components/FeedBackModal'

const Container = styled.nav`
  min-width: ${themeVal('space.s70')}px;
  width: ${themeVal('space.s70')}px;
  background-color: ${themeVal('colors.background')};
  height: 100%;
  border-right: ${themeVal('colors.accent')};
  padding-top: ${themeVal('space.s16')}px;
  padding-bottom: ${themeVal('space.s16')}px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
`

const Name = styled.div`
  color: ${themeVal('colors.secondary')};
  font-size: ${themeVal('fontSizes.body_text')}px;
  font-weight: ${themeVal('fontWeights.bold')};
  text-transform: uppercase;
  letter-spacing: 0;
  line-height: 27px;
  text-align: center;
`

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1;
`

const NavItem = styled.li`
  text-align: center;
  background-color: ${({ isMatch, theme }) =>
    isMatch
      ? `${theme.colors.background_highlight}`
      : `${theme.colors.background}`};
  border-radius: 4px;
  width: 48px;
  height: 48px;
  margin: 12px auto;
`
const CircleItem = styled.span`
  text-align: center;
  background: ${themeVal('colors.primary')};
  border-radius: 25px;
  width: 48px;
  height: 48px;
  margin: 36px auto;
`
const SecondaryButtonCustom = styled(SecondaryButton)`
  font-size: ${themeVal('fontSizes.x_small_text')}px;
  text-transform: capitalize;
  margin: 2px auto;
`
export default function NavigationBar ({ siteAcronym }) {
  let { path } = useRouteMatch()
  const theme = useTheme()

  // Get values from context
  const { setRandomKey } = useContext(ConfigContext)
  /**
   * Shot modal feedback
   */
  const [showFeedbak, setshowFeedbak] = useState(false)

  /**
   * Change language
   */

  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setRandomKey(uuidv1())
  }
  return (
    <Container>
      <Name>{siteAcronym}</Name>
      <NavList>
        <NavItem isMatch={path === '/'}>
          <Link to='/' aria-label={t('nav:goToHome')} data-cy='link-home'>
            <Home
              color={
                path === '/' ? theme.colors.icon_selected : theme.colors.icon
              }
            />
          </Link>
        </NavItem>
        <NavItem isMatch={path === '/explore'}>
          <Link
            to='/explore'
            aria-label={t('nav:exploreMap')}
            data-cy='link-explore'
          >
            <Explore
              color={
                path === '/explore'
                  ? theme.colors.icon_selected
                  : theme.colors.icon
              }
            />
          </Link>
        </NavItem>
        <NavItem isMatch={path === '/datainfo'}>
          <Link
            to='/datainfo'
            aria-label={t('nav:readMoreData')}
            data-cy='link-info'
          >
            <DataInfo
              color={
                path === '/datainfo'
                  ? theme.colors.icon_selected
                  : theme.colors.icon
              }
            />
          </Link>
        </NavItem>
        <NavItem isMatch={path === '/info'}>
          <Link
            to='/info'
            aria-label={t('nav:readMoreInfo')}
            data-cy='link-info'
          >
            <Info
              color={
                path === '/info'
                  ? theme.colors.icon_selected
                  : theme.colors.icon
              }
            />
          </Link>
        </NavItem>
      </NavList>
      <SecondaryButtonCustom
        height={24}
        width={48}
        selected
        onClick={() => changeLanguage(i18n.language === 'en' ? 'cn' : 'en')}
      >
        {t('nav:languageButton')}
      </SecondaryButtonCustom>
      <CircleItem>
        <Link onClick={() => { setshowFeedbak(true) }}>
          <Message color={theme.colors.background} />
        </Link>
      </CircleItem>
      <FeedBackModal showFeedbak={showFeedbak} onDismiss={() => { setshowFeedbak(false) }} />
    </Container>
  )
}

NavigationBar.propTypes = {
  siteAcronym: PropTypes.string.isRequired
}
