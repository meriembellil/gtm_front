import {
  GET_ORDERS
} from "./actions"

const initialState = {
  orders: null,
}

const Brands = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      state = {
        ...state,
        orders: action.payload.orders
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Brands
