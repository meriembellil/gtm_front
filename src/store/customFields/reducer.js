import {
    GET_CUSTOM_FIELDS,
} from "./actions"

const initialState = {
    fields: null,
}

const CustomFields = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOM_FIELDS:
            state = {
                ...state,
                fields: action.payload.fields
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}

export default CustomFields
