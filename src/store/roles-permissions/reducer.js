import {
    GET_ROLES_LIST,
  } from "./actions"
  
  const initialState = {
    roles: null
  }
  
  const Roles = (state = initialState, action) => {
    switch (action.type) {
      case GET_ROLES_LIST:
        state = {
          ...state,
          roles: action.payload.roles
        }
        break
      default:
        state = { ...state }
        break
    }
    return state
  }
  
  export default Roles
  