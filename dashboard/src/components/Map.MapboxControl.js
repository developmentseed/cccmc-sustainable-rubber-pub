'use strict'
import { render, unmountComponentAtNode } from 'react-dom'

export default class MapboxControl {
  constructor (renderFn) {
    if (!renderFn) throw new Error('Missing render function')

    this.renderFn = renderFn
    this._container = null
  }

  onAdd (map) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl'
    this._container.id = 'customctrl'
    return this._container
  }

  onRemove () {
    unmountComponentAtNode(this._container)
    this._container.parentNode.removeChild(this._container)
  }
  render (props) {
    if (!this._container) {
      this._container = document.getElementById('customctrl')
    }
    render(this.renderFn(props), this._container)
  }
}
