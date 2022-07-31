import {
  GET_STORE,
  GET_STORES,
} from "./actions"

const initialState = {
  stores: null,
  store: null
}

const Store = (state = initialState, action) => {
  switch (action.type) {
    case GET_STORES:
      state = {
        ...state,
        stores: action.payload.stores
      }
      break
    case GET_STORE:
      state = {
        ...state,
        store: action.payload.store
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default Store
