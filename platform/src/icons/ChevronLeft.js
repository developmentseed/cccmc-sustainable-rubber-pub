import React from 'react'
import PropTypes from 'prop-types'

const ChevronLeft = ({ color = 'none' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='8pt'
    height='12pt'
    viewBox='0 0 8 12'
  >
    <path
      fill={color}
      d='M 0.863281 5.601562 L 5.722656 1.046875 C 5.957031 0.828125 6.335938 0.828125 6.570312 1.046875 L 7.136719 1.578125 C 7.371094 1.796875 7.371094 2.152344 7.136719 2.375 L 3.289062 6 L 7.136719 9.625 C 7.371094 9.847656 7.371094 10.203125 7.136719 10.421875 L 6.570312 10.953125 C 6.335938 11.171875 5.957031 11.171875 5.722656 10.953125 L 0.863281 6.398438 C 0.628906 6.179688 0.628906 5.820312 0.863281 5.601562 Z M 0.863281 5.601562 '
    />
  </svg>
)

export default ChevronLeft

ChevronLeft.propTypes = {
  color: PropTypes.string
}
