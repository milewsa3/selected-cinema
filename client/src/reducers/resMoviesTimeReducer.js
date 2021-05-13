import {
    RES_MOVIES_TIME_FAILURE,
    RES_MOVIES_TIME_REQUEST,
    RES_MOVIES_TIME_SUCCESS
} from "../constants/actionTypes";

const initState = {
    data: null,
    loading: false,
    error: null
}

const resMoviesTimeReducer = (state = initState, action) => {
    switch (action.type) {
        case RES_MOVIES_TIME_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                data: null
            }
        case RES_MOVIES_TIME_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case RES_MOVIES_TIME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: null
            }
        default:
            return state
    }
}

export default resMoviesTimeReducer