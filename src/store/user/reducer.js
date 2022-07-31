import {
  GET_PROFILE,
  GET_USERS_LIST,
  UPDATE_USER,
} from "./actions"

const initialState = {
  user: null,
  usersList: null
}

const User = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      state = {
        ...state,
        user: action.payload.user
      }
      break
    case UPDATE_USER:
      state = {
        ...state,
        user: action.payload.user
      }
      break
    case GET_USERS_LIST:
      state = {
        ...state,
        usersList: action.payload.usersList
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default User
