import React from 'react'
import PropTypes from 'prop-types'

const Layers = ({ color = 'none' }) => (
  <svg
    width='29px'
    height='29px'
    viewBox='0 0 24 24'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(-243.000000, -2046.000000)'>
        <g transform='translate(243.000000, 2046.000000)'>
          <path
            d='M12,13 L4,9 L12,5 L20,9 L12,13 Z M18.397,11.2 L20,12 L12,16 L4,12 L5.603,11.2 L12,14.397 L18.397,11.2 Z M18.397,14.2 L20,15 L12,19 L4,15 L5.603,14.2 L12,17.397 L18.397,14.2 Z'
            fill={color}
            fillRule='nonzero'
          />
        </g>
      </g>
    </g>
  </svg>
)

export default Layers

Layers.propTypes = {
  color: PropTypes.string
}
