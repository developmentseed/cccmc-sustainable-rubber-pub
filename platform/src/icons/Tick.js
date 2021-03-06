import React from 'react'
import PropTypes from 'prop-types'

const Tick = ({ color = 'none' }) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 16 16'
  >
    <rect width='16' height='16' fill='none' />
    <path
      fill={color}
      d='M2,9.014L3.414,7.6L6.004,10.189L12.593,3.6L14.007,5.014L6.003,13.017L2,9.014Z'
    />
  </svg>
)

export default Tick

Tick.propTypes = {
  color: PropTypes.string
}
