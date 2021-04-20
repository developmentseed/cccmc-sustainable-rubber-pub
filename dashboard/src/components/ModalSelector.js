import React, { useContext } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { PrimaryButton, Divider } from './Buttons'
import { themeVal } from '../utils/utils'
import { ConfigContext } from '../contexts/ConfigContext'
import CountryFlags from '../icons/CountryFlags'

const DialogOverlayExtend = styled(DialogOverlay)`
  display: block;
  position: fixed;
  z-index: 9999;
  left: ${themeVal('space.s70')}px;
  top: 0;
  width: calc(100% - ${themeVal('space.s70')}px);
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 8, 20, 0.86);
`

const DialogContentExtend = styled(DialogContent)`
  background-color: ${themeVal('colors.background')};
  margin: 15% auto;
  border: 1px solid ${themeVal('colors.accent')};
  width: 30%;
  min-width: 547px;
  min-height: 364px;
`

const DescriptionContent = styled.div`
  padding: ${themeVal('space.s32')}px;
`
const DescriptionFooter = styled.div`
  padding: ${themeVal('space.s16')}px ${themeVal('space.s32')}px;
  text-align: end;
`

const CountriesButtonContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${themeVal('space.s8')}px;
  justify-items: stretch;
  align-items: inital;
  > button {
    text-transform: capitalize;
  }
`

const Flag = styled.span`
  margin-right: ${themeVal('space.s8')}px;
  line-height: 12px;
`
const PrimaryButtonCustom = styled(PrimaryButton)`
  background: ${themeVal('colors.background')};
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ highlight }) =>
    highlight ? themeVal('colors.secondary') : themeVal('colors.accent')};

  padding: ${themeVal('space.s16')}px;
  min-width: 140px;
  line-height: normal;
  > label {
    color: ${themeVal('colors.text')};
    font-size: ${themeVal('fontSizes.small_title')}px;
    letter: normal;
  }
  outline: none;
`
const PrimaryButtonExplore = styled(PrimaryButton)`
  text-transform: uppercase;
`

const ModalSelector = ({ clearDatalayers }) => {
  const { countries, dispatchSetCountryConfig } = useContext(ConfigContext)
  const [showDialog, setShowDialog] = React.useState(true)
  const [countryAbrev, setCountryAbrev] = React.useState(null)
  /**
   * Selection of country Id
   * @param {string} countryId
   */
  const setCountry = (countryId) => {
    dispatchSetCountryConfig({
      type: 'SET_COUNTRY',
      countryId
    })
    clearDatalayers()
    setShowDialog(false)
  }
  // const close = () => setShowDialog(false)

  const { t } = useTranslation()
  return (
    <div>
      {/* onDismiss={close} */}
      <DialogOverlayExtend isOpen={showDialog}>
        <DialogContentExtend>
          <DescriptionContent>
            <h2>{t('explore:selectCountry')}</h2>
            <p>{t('explore:chooseTheCountry')}</p>
            <CountriesButtonContent>
              {countries.map((country) => (
                <PrimaryButtonCustom
                  height={64}
                  key={country.countryCode}
                  selected={false}
                  onClick={() => {
                    setCountryAbrev(country.countryCode)
                  }}
                  highlight={country.countryCode === countryAbrev}
                >
                  <Flag>
                    <CountryFlags countryCode={country.countryCode} />
                  </Flag>
                  <label>{t(`explore:${country.countryName}`)}</label>
                </PrimaryButtonCustom>
              ))}
            </CountriesButtonContent>
          </DescriptionContent>
          <Divider />
          <DescriptionFooter>
            <PrimaryButtonExplore
              width={180}
              height={48}
              selected={!!countryAbrev}
              disabled={!countryAbrev}
              onClick={() => {
                setCountry(countryAbrev)
              }}
            >
              {t('explore:startExploring')}
            </PrimaryButtonExplore>
          </DescriptionFooter>
        </DialogContentExtend>
      </DialogOverlayExtend>
    </div>
  )
}

export default ModalSelector
