import {RES_MOVIES_FAILURE, RES_MOVIES_REQUEST, RES_MOVIES_SUCCESS} from "../constants/actionTypes";
import * as api from "../api";

export const getMoviesByDateAction = (date) => async (dispatch) => {
    dispatch({type: RES_MOVIES_REQUEST})

    try {
        const movies = await api.getMoviesByDate(date)
        const parsedMovies = movies.map(movie => {
            movie.TMDB = JSON.parse(movie.TMDB)
            return movie
        })

        dispatch({type: RES_MOVIES_SUCCESS, payload: parsedMovies})
    } catch (error) {
        dispatch({type: RES_MOVIES_FAILURE, error: error.response.data})
    }
}