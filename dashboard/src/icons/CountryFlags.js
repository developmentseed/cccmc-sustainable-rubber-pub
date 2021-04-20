import React from 'react'
import PropTypes from 'prop-types'

const CountryFlags = ({ countryCode }) => {
  return (
    <div>
      {countryCode === 'la' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          id='flag-icon-css-la'
          viewBox='0 0 640 480'
          style={{
            width: '48px',
            height: '31px'
          }}
        >
          <defs>
            <clipPath id='a'>
              <path fill-opacity='.7' d='M0 0h640v480H0z' />
            </clipPath>
          </defs>
          <g fill-rule='evenodd' clip-path='url(#a)'>
            <path fill='#ce1126' d='M-40 0h720v480H-40z' />
            <path fill='#002868' d='M-40 119.3h720v241.4H-40z' />
            <path
              fill='#fff'
              d='M423.4 240a103.4 103.4 0 1 1-206.8 0 103.4 103.4 0 1 1 206.8 0z'
            />
          </g>
        </svg>
      ) : countryCode === 'mm' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          // xmlns:xlink='http://www.w3.org/1999/xlink'
          id='flag-icon-css-mm'
          viewBox='0 0 640 480'
          style={{
            width: '48px',
            height: '31px'
          }}
        >
          <defs>
            <path
              id='a'
              fill='#fff'
              d='M0-.5l.2.5h-.4z'
              transform='scale(8.844)'
            />
            <g id='b'>
              <use
                width='18'
                height='12'
                transform='rotate(-144)'
                // xlink:href='#a'
              />
              <use
                width='18'
                height='12'
                transform='rotate(-72)'
                // xlink:href='#a'
              />
              <use
                width='18'
                height='12'
                // xlink:href='#a'
              />
              <use
                width='18'
                height='12'
                transform='rotate(72)'
                // xlink:href='#a'
              />
              <use
                width='18'
                height='12'
                transform='rotate(144)'
                // xlink:href='#a'
              />
            </g>
          </defs>
          <path fill='#fecb00' d='M0-.1h640V160H0z' />
          <path fill='#ea2839' d='M0 320h640v160H0z' />
          <path fill='#34b233' d='M0 160h640v160H0z' />
          <use
            width='18'
            height='12'
            x='9'
            y='6.4'
            transform='matrix(40 0 0 40 -40 0)'
            // xlink:href='#b'
          />
        </svg>
      ) : countryCode === 'vn' ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          id='flag-icon-css-vn'
          viewBox='0 0 640 480'
          style={{
            width: '48px',
            height: '31px'
          }}
        >
          <defs>
            <clipPath id='a'>
              <path fill-opacity='.7' d='M-85.3 0h682.6v512H-85.3z' />
            </clipPath>
          </defs>
          <g
            fill-rule='evenodd'
            clip-path='url(#a)'
            transform='translate(80) scale(.9375)'
          >
            <path fill='#ec0015' d='M-128 0h768v512h-768z' />
            <path
              fill='#ff0'
              d='M349.6 381L260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z'
            />
          </g>
        </svg>
      ) : (
        <></>
      )}
    </div>
  )
}

export default CountryFlags

CountryFlags.propTypes = {
  countryCode: PropTypes.string
}
