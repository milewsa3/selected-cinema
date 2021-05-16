import {RES_MOVIES_SEAT_FAILURE, RES_MOVIES_SEAT_REQUEST, RES_MOVIES_SEAT_SUCCESS,} from "../constants/actionTypes";
import * as api from "../api";

export const getScreeningAction = (date, movie_id) => async (dispatch) => {
    dispatch({type: RES_MOVIES_SEAT_REQUEST})

    try {
        const screening = await api.getScreening(date, movie_id)

        dispatch({type: RES_MOVIES_SEAT_SUCCESS, payload: screening})
    } catch (error) {
        dispatch({type: RES_MOVIES_SEAT_FAILURE, error: error})
    }
}