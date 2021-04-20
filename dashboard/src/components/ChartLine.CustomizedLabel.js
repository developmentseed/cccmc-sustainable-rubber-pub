import React, { PureComponent } from 'react'

class CustomizedLabel extends PureComponent {
  render () {
    const { x, y, stroke, value } = this.props

    return (
      <g>
        <text
          x={x}
          y={y}
          dy={-4}
          fill={stroke}
          fontSize={10}
          textAnchor='middle'
          style={{
            fill: '#000'
          }}
        >
          {value}
        </text>
      </g>
    )
  }
}

export default CustomizedLabel
