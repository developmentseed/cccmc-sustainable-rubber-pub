import React, { useContext } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import InfoButton from './InfoButton'
import { ConfigContext } from '../contexts/ConfigContext'
import { PrimaryButton } from '../components/Buttons'
import { themeVal } from '../utils/utils'

const AdminSelectorContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

const ViewTrends = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${themeVal('space.s8')}px;
  width: fit-content;
  > div {
    display: inline-flex;
    gap: ${themeVal('space.s4')}px;
    align-items: center;
    font-weight: ${themeVal('fontWeights.bold')};
    font-size: ${themeVal('fontSizes.small_title')}px;
  }
`
const LevelButtonsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 0px;
  justify-items: stretch;
  align-items: inital;
  padding: ${themeVal('space.s4')}px ${themeVal('space.s4')}px;
  > button {
    text-transform: capitalize;
  }
`

const AdminSelector = () => {
  const { adminLevel, dispatchSetAdminLevel, countryConfig } = useContext(
    ConfigContext
  )
  const setAdminLevel = (countryId, adminLevel) => {
    dispatchSetAdminLevel({
      type: 'SET_ADMIN_LEVEL',
      payload: {
        countryId,
        adminLevel
      }
    })
  }

  const { t } = useTranslation()

  return (
    <AdminSelectorContent>
      <ViewTrends>
        <div>{t('explore:viewTrendsBy')}</div>
        <InfoButton
          info={t('explore:chooseDataGranularity')}
          aria-label={`info about layer`}
        />
      </ViewTrends>

      <LevelButtonsContent>
        {['country', 'province', 'county'].map((admin) => (
          <PrimaryButton
            height={40}
            key={admin}
            selected={adminLevel === admin}
            onClick={() => {
              setAdminLevel(countryConfig.countryCode, admin)
            }}
          >
            {t(`explore:${admin}`)}
          </PrimaryButton>
        ))}
      </LevelButtonsContent>
    </AdminSelectorContent>
  )
}

export default AdminSelector

AdminSelector.propTypes = {
  adminLevel: PropTypes.string.isRequired,
  countryConfig: PropTypes.object.isRequired,
  dispatchSetAdminLevel: PropTypes.func.isRequired
}
