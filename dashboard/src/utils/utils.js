import get from 'lodash.get'
import { formatThousands } from './format'

export const getflag = (cc) => {
  const ASCII_OFFSET = 127397
  const chars = [...cc.toUpperCase()].map((c) => c.charCodeAt() + ASCII_OFFSET)
  return String.fromCodePoint(...chars)
}

export const dataFormater = (number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + 'B'
  } else if (number > 1000000) {
    return (number / 1000000).toString() + 'M'
  } else if (number > 1000) {
    return (number / 1000).toString() + 'K'
  } else {
    return number.toString()
  }
}

/**
 * Returns a function to be used with styled-components and get's a value from
 * the theme property.
 *
 * @param {string} path The path to get from theme
 */
export const themeVal = (path) => ({ theme }) => {
  const v = get(theme, path, undefined)
  if (v === undefined) {
    console.error(
      // eslint-disable-line
      `Theme Value Error: path [${path}] not found in theme.`,
      theme
    )
  }
  return v
}

export const fixValue = (v) => {
  if (!v) return ''
  if (!Number.isInteger(v)) {
    return `${formatThousands(parseFloat(v).toFixed(2))}`
  } else if (Number.isInteger(v)) {
    return `${formatThousands(v)}`
  }
  return `${v}`
}
