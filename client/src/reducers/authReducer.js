import {AUTH, AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, LOGOUT} from "../constants/actionTypes"

const initState = {
    authData: null,
    loading: false,
    error: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case AUTH_SUCCESS:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))

            return {
                ...state,
                loading: false,
                authData: action.payload
            }
        case AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                authData: null
            }
        case LOGOUT:
            localStorage.clear()

            return {
                ...state,
                authData: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export default authReducer