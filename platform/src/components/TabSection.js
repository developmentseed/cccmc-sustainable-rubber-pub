import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { themeVal } from '../utils/utils'
import { TabPanel } from '@reach/tabs'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from '@reach/accordion'
import '@reach/accordion/styles.css'

import {
  ToggleButton,
  FirstLevelHeader,
  FirstLevelHeading
} from './LayerControlFirstLevelPanel'
import { Plus, Minus } from './../icons'
import Markdown from '../components/Markdown'

const CustomAccordionItem = styled(AccordionItem)`
  background: ${themeVal('colors.background')};
  margin: ${themeVal('space.s8')}px 0px;
`
const MarkdownContainer = styled.div`
  padding: ${themeVal('space.s16')}px;
  font-size: ${themeVal('fontSizes.small_body_text')}px;
  > p {
    font-size: ${themeVal('fontSizes.small_body_text')}px;
  }
`
export default function TabSection ({ infos }) {
  const [indices, setIndices] = useState([])
  function toggleAccordionItem (toggledIndex) {
    if (indices.includes(toggledIndex)) {
      setIndices(
        indices.filter((currentIndex) => currentIndex !== toggledIndex)
      )
    } else {
      setIndices([...indices, toggledIndex].sort())
    }
  }
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <TabPanel>
      <Accordion index={indices} onChange={toggleAccordionItem}>
        {Array.from(infos).map((info, index) => {
          return (
            <CustomAccordionItem key={info.title}>
              <FirstLevelHeader isOpen={indices.includes(index)}>
                <ToggleButton as={AccordionButton}>
                  <FirstLevelHeading>
                    <h3>{t(`dataInfo:${info.title}`)}</h3>
                  </FirstLevelHeading>
                  {indices.includes(index) ? (
                    <span role='img' aria-label='chevron up'>
                      <Minus color={theme.colors.text} />
                    </span>
                  ) : (
                    <span role='img' aria-label='chevron down'>
                      <Plus color={theme.colors.text} />
                    </span>
                  )}
                </ToggleButton>
              </FirstLevelHeader>
              <AccordionPanel>
                <MarkdownContainer>
                  <Markdown text={t(`dataInfo:${info.body}`)} />
                </MarkdownContainer>
              </AccordionPanel>
            </CustomAccordionItem>
          )
        })}
      </Accordion>
    </TabPanel>
  )
}

TabSection.propTypes = {
  infos: PropTypes.array.isRequired
}
