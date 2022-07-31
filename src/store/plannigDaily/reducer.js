import {
    GET_PLANNINGDAILY
  } from "./actions"
  
  const initialState = {
    plannigDailys: null,
  }
  
  const PlannigDailys = (state = initialState, action) => {
    switch (action.type) {
      case   GET_PLANNINGDAILY:
        state = {
          ...state,
          plannigDailys: action.payload.PlannigDailys
        }
        break
      default:
        state = { ...state }
        break
    }
    return state
  }
  
  export default PlannigDailys
  