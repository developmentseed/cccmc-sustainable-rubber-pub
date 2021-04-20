import React from 'react'
import PropTypes from 'prop-types'

const Plus = ({ color = 'none' }) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width='24px'
    height='24px'
    viewBox='0 0 24 24'
  >
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(-283.000000, -2046.000000)'>
        <g transform='translate(283.000000, 2046.000000)'>
          <polygon
            fill={color}
            fillRule='nonzero'
            points='18 11 13 11 13 6 11 6 11 11 6 11 6 13 11 13 11 18 13 18 13 13 18 13'
          />
        </g>
      </g>
    </g>
  </svg>
)

export default Plus

Plus.propTypes = {
  color: PropTypes.string
}
