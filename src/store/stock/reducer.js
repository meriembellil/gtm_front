import {
  GET_BRANDS
} from "./actions"

const initialState = {
  brands: null,
}

const Brands = (state = initialState, action) => {
  switch (action.type) {
    case   GET_BRANDS:
      state = {
        ...state,
        brands: action.payload.brands
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Brands
