import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { themeVal } from '../utils/utils'
import DS_LOGO from '../../img/ds-logo.svg'
import CCCMC_LOGO from '../../img/CCCMC_LOGO.png'

const Container = styled.div`
  border-radius: ${themeVal('borderRadius')}px;
  display: flex;
  gap: ${themeVal('space.s32')}px;
  justify-content: space-between;
  align-items: center;
`

export default function Credits () {
  const { i18n } = useTranslation()

  return (
    <Container>
      <a
        href={`http://${
          i18n.language === 'cn' ? '' : i18n.language + '.'
        }cccmc.org.cn/`}
        target='_blank'
      >
        <img alt='info' src={CCCMC_LOGO} height={120} />
      </a>

      <a href='https://developmentseed.org/' target='_blank'>
        <img alt='info' src={DS_LOGO} height={50} />
      </a>
    </Container>
  )
}
