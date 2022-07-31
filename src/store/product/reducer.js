import {
  GET_PRODUCTS
} from "./actions"

const initialState = {
  products: null,
}

const Products = (state = initialState, action) => {
  switch (action.type) {
    case   GET_PRODUCTS:
      state = {
        ...state,
        products: action.payload.products
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Products
