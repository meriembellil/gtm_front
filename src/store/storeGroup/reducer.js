import {
  GET_STORE_GROUP
} from "./actions"

const initialState = {
  storeGroups: null,
}

const StoreGroups = (state = initialState, action) => {
  switch (action.type) {
    case   GET_STORE_GROUP:
      state = {
        ...state,
        storeGroups: action.payload.storeGroups
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default StoreGroups
