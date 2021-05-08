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
    const { data: movies } = await API.get('/movies', {params: {ids}})

    function removeSpecialChars(string) {
        let result = string

        const specialCharacters = ['%']
        specialCharacters.forEach(character => {
            result = result.replace(character, '')
        })

        return result
    }

    let results = []
    for (let i=0; i< movies.length; i++) {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=a11ffe1b32709f5551e64f4683d948a3&query=${removeSpecialChars(movies[i].title)}&language=${'en-en'}`
        )

        results.push(data.results[0])
    }

    return results
}