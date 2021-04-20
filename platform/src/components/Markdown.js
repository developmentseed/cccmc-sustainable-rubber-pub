import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdownWithHtml from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import styled from 'styled-components'
import { themeVal } from '../utils/utils'

const MarkdownContainer = styled.div`
  > table,
  th,
  td {
    border: 1px solid ${themeVal('colors.primary_variant')};
    padding: 5px;
  }
  > p {
    color: ${themeVal('colors.text')};
    font-size: ${themeVal('fontSizes.small_body_text')}px;
    letter: normal;
  }
`
const Markdown = ({ text }) => {
  return (
    <MarkdownContainer>
      <ReactMarkdownWithHtml
        plugins={[gfm]}
        children={text}
        allowDangerousHtml
      />
    </MarkdownContainer>
  )
}

export default Markdown

Markdown.propTypes = {
  text: PropTypes.string.isRequired
}
