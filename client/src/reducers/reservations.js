import {
    CREATE_FAILURE,
    CREATE_REQUEST,
    CREATE_SUCCESS,
    DELETE_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS,
    FETCH_ALL_FAILURE,
    FETCH_ALL_REQUEST,
    FETCH_ALL_SUCCESS
} from "../constants/actionTypes";

const initState = {
    data: [],
    loading: false,
    error: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case FETCH_ALL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                data: []
            }
        case FETCH_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case FETCH_ALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: []
            }
        case CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data ,action.payload]
            }
        case CREATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.filter((reservation) => reservation._id !== action.payload)
            }
        case DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        default:
            return state
    }
}