import {combineReducers} from 'redux'

import auth from './authReducer'
import resMovies from './resMoviesReducer'

export default combineReducers({ auth, resMovies })