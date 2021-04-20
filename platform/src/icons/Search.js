import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ color = 'none' }) => (
  <svg
    width='24px'
    height='24px'
    viewBox='0 0 24 24'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g transform='translate(-203.000000, -2046.000000)'>
        <g transform='translate(203.000000, 2046.000000)'>
          <path
            d='M19.708,17.587 L16.033,13.912 C16.646,12.92 17,11.751 17,10.5 C17,6.91 14.09,4 10.5,4 C6.91,4 4,6.91 4,10.5 C4,14.09 6.91,17 10.5,17 C11.751,17 12.92,16.646 13.912,16.033 L17.587,19.708 C17.976,20.097 18.612,20.097 19.001,19.708 L19.708,19.001 C20.097,18.612 20.097,17.976 19.708,17.587 Z M7.318,13.682 C6.468,12.832 6,11.702 6,10.5 C6,9.298 6.468,8.168 7.318,7.318 C8.168,6.468 9.298,6 10.5,6 C11.702,6 12.832,6.468 13.682,7.318 C14.532,8.168 15,9.298 15,10.5 C15,11.702 14.532,12.832 13.682,13.682 C12.832,14.532 11.702,15 10.5,15 C9.298,15 8.168,14.532 7.318,13.682 Z'
            id='Shape'
            fill={color}
            fillRule='nonzero'
          />
        </g>
      </g>
    </g>
  </svg>
)

export default Search

Search.propTypes = {
  color: PropTypes.string
}
