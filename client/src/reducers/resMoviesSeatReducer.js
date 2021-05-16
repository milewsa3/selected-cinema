import {RES_MOVIES_SEAT_FAILURE, RES_MOVIES_SEAT_REQUEST, RES_MOVIES_SEAT_SUCCESS,} from "../constants/actionTypes";

const initState = {
    data: null,
    loading: false,
    error: null
}

const resMoviesSeatReducer = (state = initState, action) => {
    switch (action.type) {
        case RES_MOVIES_SEAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                data: null
            }
        case RES_MOVIES_SEAT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case RES_MOVIES_SEAT_FAILURE:
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

export default resMoviesSeatReducer