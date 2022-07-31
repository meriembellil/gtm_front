import {
    GET_CATEGORIES,
    GET_FAMILIES,
} from "./actions"

const initialState = {
    families: null,
    categories: null
}

const Families = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAMILIES:
            state = {
                ...state,
                families: action.payload.families
            }
            break
        case GET_CATEGORIES:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break
        default:
            state = { ...state }
            break
    }
    return state
}

export default Families
