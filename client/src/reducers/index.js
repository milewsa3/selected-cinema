import {combineReducers} from 'redux'

import auth from './authReducer'
import resMovies from './resMoviesReducer'
import resMoviesTime from './resMoviesTimeReducer'

export default combineReducers({ auth, resMovies, resMoviesTime })