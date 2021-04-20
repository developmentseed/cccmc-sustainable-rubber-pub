import React from 'react'
import PropTypes from 'prop-types'

const ChevronDown = ({ color = 'none' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='7pt'
    height='8pt'
    viewBox='0 0 7 8'
    version='1.1'
  >
    <path
      fill={color}
      d='M 3.234375 5.960938 L 0.199219 2.925781 C 0.0507812 2.777344 0.0507812 2.539062 0.199219 2.394531 L 0.550781 2.039062 C 0.699219 1.894531 0.9375 1.894531 1.082031 2.039062 L 3.5 4.445312 L 5.917969 2.039062 C 6.0625 1.894531 6.300781 1.894531 6.449219 2.039062 L 6.800781 2.394531 C 6.949219 2.539062 6.949219 2.777344 6.800781 2.925781 L 3.765625 5.960938 C 3.617188 6.105469 3.382812 6.105469 3.234375 5.960938 Z M 3.234375 5.960938 '
    />
  </svg>
)

export default ChevronDown

ChevronDown.propTypes = {
  color: PropTypes.string
}
