import {AUTH, AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS} from '../constants/actionTypes'
import * as api from '../api'

export const signin = (formData, history) => async (dispatch) => {
    dispatch({type: AUTH_REQUEST})

    try {
        const { data } = await api.signIn(formData)
        dispatch({ type: AUTH_SUCCESS, payload: data })

        history.push('/')
    } catch (error) {
        dispatch({ type: AUTH_FAILURE, error })
    }
}

export const signup = (formData, history) => async (dispatch) => {
    dispatch({type: AUTH_REQUEST})

    try {
        const { data } = await api.signUp(formData)
        dispatch({ type: AUTH_SUCCESS, payload: data })

        history.push('/')
    } catch (error) {
        dispatch({ type: AUTH_FAILURE, error })
    }
}