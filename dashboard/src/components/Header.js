import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import styled from 'styled-components'
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption
} from '@reach/listbox'
import '@reach/listbox/styles.css'
import { useTranslation } from 'react-i18next'

import { ConfigContext } from '../contexts/ConfigContext'
import { getflag, themeVal } from '../utils/utils'
import { ChevronDown } from './../icons'

const HeaderContainer = styled.header`
  padding: ${themeVal('space.s0')}px ${themeVal('space.s4')}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${themeVal('colors.background_variant')};
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  margin: 10px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > span {
    text-transform: uppercase;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0.27px;
    font-weight: ${themeVal('fontWeights.heading')};
    color: ${themeVal('colors.title_container')};
  }
`

const Heading = styled.div`
  font-size: ${themeVal('fontSizes.small_title')}px;
  font-weight: ${themeVal('fontWeights.heading')};
  margin: 0;

  display: inline-flex;
  align-items: center;
  gap: ${themeVal('space.s8')};
  width: 100%;
  letter-spacing: 0;
  line-height: 20px;
`

const ListboxInputStyled = styled(ListboxInput)`
  position: relative;
  z-index: 99999;
`
const ListboxButtonStyled = styled(ListboxButton)`
  border: 0px solid red;
`

const Flag = styled.span`
  width: ${themeVal('fontSizes.h2')}px;
`
export default function Header ({ country, cc, clearDatalayers }) {
  const { countries, dispatchSetCountryConfig } = useContext(ConfigContext)
  const setCountry = (countryId) => {
    dispatchSetCountryConfig({
      type: 'SET_COUNTRY',
      countryId
    })
    clearDatalayers()
  }
  const { t } = useTranslation()

  return (
    <HeaderContainer>
      <TitleContainer>
        <span>{t('explore:country')}</span>
        <Heading>
          <Flag role='img' aria-label={`flag-${cc}`}>
            {getflag(cc)}
          </Flag>
          {t(`explore:${country}`)}
        </Heading>
      </TitleContainer>

      {/* <Heading> */}
      <ListboxInputStyled
        value={'default'}
        onChange={(countryId) => setCountry(countryId)}
      >
        <ListboxButtonStyled arrow={<ChevronDown color={'5D6069'} />} />
        <ListboxPopover>
          <ListboxList>
            <ListboxOption style={{ display: 'none' }} value='default' />

            {countries.map((country) => {
              return (
                <ListboxOption
                  key={country.countryCode}
                  value={country.countryCode}
                >
                  <Flag role='img' aria-label={`flag-${country.countryCode}`}>
                    {getflag(country.countryCode)}
                  </Flag>
                  {t(`explore:${country.countryName}`)}
                </ListboxOption>
              )
            })}
          </ListboxList>
        </ListboxPopover>
      </ListboxInputStyled>
      {/* </Heading> */}
    </HeaderContainer>
  )
}

Header.propTypes = {
  siteName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  cc: PropTypes.string.isRequired,
  clearDatalayers: PropTypes.func.isRequired
}
