import axios from 'axios'

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'api_key=6f8b17fa183d8dd8eea451dfc410fe20'

// Get Popular Movies
export const getPopularMovies = async () => {
    const resp = await axios.get(`${apiURL}/movie/popular?${apiKey}`)
    return resp.data.results
}

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
    const resp = await axios.get(`${apiURL}/movie/upcoming?${apiKey}`)
    return resp.data.results
}

// Get Popular Movies
export const getPopularTv = async () => {
    const resp = await axios.get(`${apiURL}/tv/popular?${apiKey}`)
    return resp.data.results
}

// Get Family Movies
export const getFamilyMovies = async () => {
    const resp = await axios.get(`${apiURL}/discover/movie?${apiKey}&with_genres=10751`)
    return resp.data.results
}

// Get Documentary Movies
export const getDocumentaryMovies = async () => {
    const resp = await axios.get(`${apiURL}/discover/movie?${apiKey}&with_genres=99`)
    return resp.data.results
}

// Get Action Movies
export const getActionMovies = async () => {
    const resp = await axios.get(`${apiURL}/discover/movie?${apiKey}&with_genres=28`)
    return resp.data.results
}
// Get Adventure Movies
export const getAdventureMovies = async () => {
    const resp = await axios.get(`${apiURL}/discover/movie?${apiKey}&with_genres=12`)
    return resp.data.results
}
// Get Movie
export const getMovie = async (id) => {
    const resp = await axios.get(`${apiURL}/movie/${id}?${apiKey}`)
    return resp.data
}

// Search for Movie or TV by Keyword
export const searchMovieTv = async (query,type) => {
    const resp = await axios.get(`${apiURL}/search/${type}?${apiKey}&query=${query}`)
    return resp.data.results
}



