import axios from 'axios'

const API = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URI}`})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/auth/signin', formData)
export const signUp = (formData) => API.post('/auth/signup', formData)
export const getMoviesByDate = async (date) => {
    const { data: ids } = await API.get(`/screenings/dated/${date}`)
    if (ids.length === 0)
        return []
    const { data: movies } = await API.get('/movies', {params: {ids}})

    return movies
}
export const getScreeningsTime = async (date, movie_id) => {
    const {data: timings} = await API.get('/screenings/timed', { params: {date, movie_id} })

    return timings
}

export const getScreening = async (date, movie_id) => {
    const { data } = await API.get('/screenings', { params: {date, movie_id} })
    return data
}