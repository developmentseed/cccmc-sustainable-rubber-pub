import React from 'react'
import PropTypes from 'prop-types'

const Minus = ({ color = 'none' }) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width='24px'
    height='24px'
    viewBox='0 0 24 24'
  >
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(-323.000000, -2046.000000)'>
        <g transform='translate(323.000000, 2046.000000)'>
          <rect x='0' y='0' width='24' height='24' />
          <polygon
            fill={color}
            fillRule='nonzero'
            points='18 11 6 11 6 13 18 13'
          />
        </g>
      </g>
    </g>
  </svg>
)

export default Minus

Minus.propTypes = {
  color: PropTypes.string
}
