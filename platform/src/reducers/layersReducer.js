import { init } from '../utils/exploreUtils'

export const layerReducer = (state, action) => {
  switch (action.type) {
    case 'toggleLayer':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          visibility: !state[action.payload].visibility
        }
      }
    case 'setSlider':
      return {
        ...state,
        [action.payload.controlId]: {
          ...state[action.payload.controlId],
          range: action.payload.range
        }
      }
    case 'CLEAR_DATALAYER':
      return {
        ...state
      }
    case 'SET_DATALAYER':
      return {
        ...state,
        dataLayers: action.payload.features
      }
    case 'reset':
      return init(action.payload)
    default:
      throw new Error()
  }
}
