import axios from "axios"

const tmdbAPI = process.env.REACT_APP_TMDB_API_KEY

export default {

    searchMovies: function(search){
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbAPI}&query=${search}`)
    },

    popularMovies: function(){
        return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbAPI}&language=en-US`)
    }
}