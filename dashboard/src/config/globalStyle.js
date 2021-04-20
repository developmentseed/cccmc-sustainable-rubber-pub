import { createGlobalStyle, css } from 'styled-components'

import { themeVal } from '../utils/utils'

// Global styles for these components are included here for performance reasons.
// This way they're only rendered when absolutely needed.

const baseStyles = css`
  html {
    overflow-y: hidden;
    height: 100vh;
    font-family: ${themeVal('fonts.body')};
    background-color: ${themeVal('colors.background')};
  }

  body {
    overflow-y: hidden;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  #app {
    height: 100vh;
  }

  /* Links
   ========================================================================== */
  h1 {
    font-size: ${themeVal('fontSizes.h1')}px;
    font-weight: ${themeVal('fontWeights.bold')};
  }
  h2 {
    font-size: ${themeVal('fontSizes.h2')}px;
  }
  h3 {
    font-size: ${themeVal('fontSizes.h3')}px;
  }
  p {
    font-size: ${themeVal('fontSizes.body_text')}px;
  }
  span {
    color: ${themeVal('colors.text')};
  }

  /* ListboxPopover

=================== */

  [data-reach-listbox-popover] {
    z-index: 2;
    border-radius: 4px;
    > ul {
      > li {
        display: flex;
      }
    }
  }
`

export default createGlobalStyle`
  ${baseStyles}
`
