import {combineReducers} from 'redux'

import auth from './authReducer'
import resMovies from './resMoviesReducer'
import resMoviesTime from './resMoviesTimeReducer'
import resMoviesSeat from './resMoviesSeatReducer'
import reservations from './reservations'

export default combineReducers({ auth, resMovies, resMoviesTime, resMoviesSeat, reservations })