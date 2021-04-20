import React from 'react'
import PropTypes from 'prop-types'

const Check = ({ color = 'none' }) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    width='24px'
    height='24px'
    viewBox='0 0 24 24'
  >
    <g
      id='Styleguide'
      stroke='none'
      stroke-width='1'
      fill='none'
      fill-rule='evenodd'
    >
      <g transform='translate(-163.000000, -2046.000000)'>
        <g transform='translate(163.000000, 2046.000000)'>
          <g
            transform='translate(6.000000, 7.000000)'
            fill={color}
            fillRule='nonzero'
          >
            <polygon points='0 6.014 1.414 4.6 4.004 7.189 10.593 0.6 12.007 2.014 4.003 10.017' />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default Check

Check.propTypes = {
  color: PropTypes.string
}
