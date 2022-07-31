import {
  LOGIN_USER, 
  LOGOUT,
} from "./actions"

const initialState = {
  token: null,
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        token: action.payload.token
      }
    case LOGOUT:
      state = {
        ...state,
        token: action.payload.token
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default auth    
