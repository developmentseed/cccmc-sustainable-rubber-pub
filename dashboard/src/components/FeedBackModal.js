import React, { useState } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import styled, { useTheme } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { PrimaryButton } from './Buttons'
import { themeVal } from '../utils/utils'
import { Close as CloseIco } from '../icons'
import config from '../config'

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

const DescriptionTitle = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-gap: 0.5rem;
  > div {
    display: flex;
    > h2 {
      flex: 1;
    }
  }
`
const Description = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-gap: 0.5rem;

  .status_form {
    padding: 0;
    margin: 0;
    text-align: center;
    color: ${({ color }) => `${color}`};
  }
`
const DimissButton = styled(PrimaryButton)`
  background: ${themeVal('colors.background_variant')};
  display: block;
  align-items: center;
  vertical-align: middle;
  border-style: solid;
  border-width: 0px;
  padding: 0px;
  width: 40px;
  height: 40px;
  line-height: normal;
  outline: none;
  text-align: center;
`
const DescriptionFooter = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-auto-flow: dense;
  grid-gap: 0.5rem;
  margin-top: 8px;
  padding-top: 8px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: ${themeVal('colors.accent')};
  > div {
    display: flex;
    flex-direction: row-reverse;
  }
`
const CustomForm = styled.form`
  display: block;
  padding: ${themeVal('space.s32')}px;
`
const CustomTextArea = styled.textarea`
  width: 100% - 32px;
  resize: none;
  height: auto;
  min-height: 8rem;
  padding: 16px;
  appearance: none;
  display: flex;
  font-family: inherit;
  font-size: 0.8rem;
  border-radius: 4px;
`
const CustomInput = styled.input`
  width: 100% - 32px;
  height: 2.5rem;
  display: flex;
  padding: 2px 16px;
  font-family: inherit;
  font-size: 0.8rem;
  border-radius: 4px;
  overflow: auto;
`
const FormControl = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-gap: 0.5rem;

  > label {
    display: inline-flex;
    font-size: 16px;
  }
`

const PrimaryButtonExplore = styled(PrimaryButton)`
  text-transform: uppercase;
`

const FeedBackModal = ({ showFeedbak, onDismiss }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [feetback, setFeetback] = useState({ email: '', message: '' })
  const [statusMail, setStatusMail] = useState({
    status: '',
    message: ''
  })

  const customDismiss = () => {
    setFeetback({ email: '', message: '' })
    setStatusMail({
      status: '',
      message: ''
    })
    onDismiss()
  }
  const handleSubmit = (ev) => {
    ev.preventDefault()

    // var data2 = new FormData(feetback)
    fetch(ev.target.action, {
      method: ev.target.method,
      body: JSON.stringify({ ...feetback, _subject: 'Feedback to RRMP' }),
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        setFeetback({ email: '', message: '' })

        setStatusMail({
          status: 'success',
          message: 'successMessage'
        })
      })
      .catch(() => {
        setStatusMail({
          status: 'error',
          message: 'errorMessage'
        })
      })
  }

  const handleChange = (event) =>
    setFeetback({ ...feetback, [event.target.name]: event.target.value })
  return (
    <div>
      {/* onDismiss={close} */}
      <DialogOverlayExtend isOpen={showFeedbak} onDismiss={customDismiss}>
        <DialogContentExtend>
          <CustomForm
            action={config.formAction}
            method='POST'
            onSubmit={handleSubmit}
          >
            <DescriptionTitle>
              <div>
                {' '}
                <h2>{t('nav:sendFeedback')}</h2>
                <DimissButton onClick={onDismiss}>
                  <CloseIco color={theme.colors.text} />
                </DimissButton>
              </div>
            </DescriptionTitle>
            <Description>
              <p>{t('nav:sendFeedbackBody')}</p>
            </Description>
            {['success', 'error'].includes(statusMail.status) ? (
              <Description color={theme.colors[statusMail.status]}>
                <p className='status_form'>{t(`nav:${statusMail.message}`)}</p>
              </Description>
            ) : null}
            <FormControl>
              <label>{t('nav:sendFeedbackEmail')}</label>
              <CustomInput
                type='email'
                name='email'
                value={feetback.email}
                required
                onChange={handleChange}
                placeholder={t('nav:sendFeedbackEmailPlaceholder')}
              />
            </FormControl>
            <FormControl>
              <label>{t('nav:sendFeedbackMessage')}</label>
              <CustomTextArea
                placeholder={t('nav:sendFeedbackPlaceholder')}
                onChange={handleChange}
                name='message'
                rows={8}
                required
                value={feetback.message}
              />
            </FormControl>
            <DescriptionFooter>
              <div>
                {' '}
                <PrimaryButtonExplore
                  width={180}
                  height={48}
                  type='submit'
                  selected={!!feetback.message && !!feetback.email}
                >
                  {t('nav:sendFeedbackSend')}
                </PrimaryButtonExplore>
              </div>
            </DescriptionFooter>
          </CustomForm>
        </DialogContentExtend>
      </DialogOverlayExtend>
    </div>
  )
}

export default FeedBackModal
