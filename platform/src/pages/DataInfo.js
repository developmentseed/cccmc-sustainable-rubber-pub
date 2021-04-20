import PropTypes from 'prop-types'
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Tabs, TabList, Tab, TabPanels } from '@reach/tabs'

import { SecondaryButtonCSS } from '../components/Buttons'
import { themeVal } from '../utils/utils'
import '@reach/accordion/styles.css'
import dataInfoTabs from '../config/dataInfo'

import PageLayout, {
  InfoBlock,
  Tagline,
  PageTitle
} from '../components/PageLayout'
import TabSection from './../components/TabSection'
export const TabButton = styled(Tab)`
  ${SecondaryButtonCSS}
`
const TabListCustom = styled(TabList)`
  display: grid;
  grid-template-columns: repeat(auto-fill, 190px);
  gap: ${themeVal('space.s8')}px;
  margin-bottom: ${themeVal('space.s16')}px;
`
const TabPanelsCustom = styled(TabPanels)`
  display: grid;
  grid-template-columns: repeat(1, minmax(600px, 0.8fr));
`
function Customtab (props) {
  const { isSelected, children } = props
  return (
    <TabButton {...props} selected={isSelected}>
      {children}
    </TabButton>
  )
}
export default function DataInfo ({ siteAcronym }) {
  // Todo : enable and diable button colors
  const theme = useTheme()
  const { t } = useTranslation()
  const {
    generalRisksinfo,
    rubberEcoinfo,
    envRiskinfo,
    rubberMLInfos,
    socialRiskInfos
  } = dataInfoTabs

  return (
    <PageLayout siteAcronym={siteAcronym} theme={theme}>
      <InfoBlock>
        <Tagline>{t('dataInfo:dataInformation')}</Tagline>
        <PageTitle>{t('dataInfo:layersDetails')}</PageTitle>
        <Tabs>
          <TabListCustom>
            <Customtab height={48}>{t('dataInfo:riskData')}</Customtab>
            <Customtab height={48}>{t('dataInfo:naturalRubberRisk')}</Customtab>
            <Customtab height={48}>{t('dataInfo:enviromentalRisk')}</Customtab>
            <Customtab height={48}>{t('dataInfo:socialRisk')}</Customtab>
            <Customtab height={48}>{t('dataInfo:economicRisk')}</Customtab>
          </TabListCustom>
          <TabPanelsCustom>
            <TabSection infos={generalRisksinfo} />
            <TabSection infos={rubberMLInfos} />
            <TabSection infos={envRiskinfo} />
            <TabSection infos={socialRiskInfos} />
            <TabSection infos={rubberEcoinfo} />
          </TabPanelsCustom>
        </Tabs>
      </InfoBlock>
    </PageLayout>
  )
}
DataInfo.propTypes = {
  siteAcronym: PropTypes.string.isRequired
}
