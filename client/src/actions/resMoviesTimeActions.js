import {RES_MOVIES_TIME_FAILURE, RES_MOVIES_TIME_REQUEST, RES_MOVIES_TIME_SUCCESS} from "../constants/actionTypes";
import * as api from "../api";

export const getScreeningsTimeAction = (date, film_id) => async (dispatch) => {
    dispatch({type: RES_MOVIES_TIME_REQUEST})

    try {
        const times = await api.getScreeningsTime(date, film_id)

        dispatch({type: RES_MOVIES_TIME_SUCCESS, payload: times})
    } catch (error) {
        dispatch({type: RES_MOVIES_TIME_FAILURE, error: error})
    }
}