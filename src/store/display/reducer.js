import {
  GET_DISPLAY_TYPES,
  GET_DISPLAY_SECTIONS
} from "./actions"

const initialState = {
  displayTypes: null,
  displaySections: null,
  displayList: null
}

const Display = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISPLAY_TYPES:
      state = {
        ...state,
        displayTypes: action.payload.displayTypes
      }
      break
    case GET_DISPLAY_SECTIONS:
      state = {
        ...state,
        displaySections: action.payload.displaySections
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Display
