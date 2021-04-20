import React from 'react'
import PropTypes from 'prop-types'

const ChevronRight = ({ color = 'none' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='8pt'
    height='12pt'
    viewBox='0 0 8 12'
  >
    <path
      fill={color}
      d='M 7.136719 6.398438 L 2.277344 10.953125 C 2.042969 11.171875 1.664062 11.171875 1.429688 10.953125 L 0.863281 10.421875 C 0.628906 10.203125 0.628906 9.847656 0.863281 9.625 L 4.710938 6 L 0.863281 2.375 C 0.628906 2.152344 0.628906 1.796875 0.863281 1.578125 L 1.429688 1.046875 C 1.664062 0.828125 2.042969 0.828125 2.277344 1.046875 L 7.136719 5.601562 C 7.371094 5.820312 7.371094 6.179688 7.136719 6.398438 Z M 7.136719 6.398438 '
    />
  </svg>
)

export default ChevronRight

ChevronRight.propTypes = {
  color: PropTypes.string
}
