import * as api from '../api/index'
import {
    CREATE_FAILURE,
    CREATE_REQUEST,
    CREATE_SUCCESS, DELETE_FAILURE, DELETE_REQUEST, DELETE_SUCCESS,
    FETCH_ALL_FAILURE,
    FETCH_ALL_REQUEST,
    FETCH_ALL_SUCCESS
} from "../constants/actionTypes";

export const getReservations = (user_id) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ALL_REQUEST })

        const { data } = await api.fetchReservations(user_id)

        dispatch({ type: FETCH_ALL_SUCCESS, payload: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_ALL_FAILURE, error })
    }
}

export const createReservation = (reservation) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REQUEST })

        const { data: created_reservation } = await api.createReservation(reservation);
        const { data: detailed_reservation } = await api.getDetailedReservation(created_reservation._id)

        dispatch({ type: CREATE_SUCCESS, payload: detailed_reservation });
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_FAILURE, error });
    }
};

export const deleteReservation = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REQUEST })

        await api.deleteReservation(id)

        dispatch({ type: DELETE_SUCCESS, payload: id })
    } catch (error) {
        console.log(error)
        dispatch({ type: DELETE_FAILURE, error })
    }
}