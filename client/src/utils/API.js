import axios from "axios"

const tmdbAPI = process.env.REACT_APP_TMDB_API_KEY

export default {
    
    searchMovies: function(search){
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbAPI}&query=${search}`)
    },
    popularMovies: function(){
        return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbAPI}&language=en-US`)
    },
    findByMovieId: function(id){
        return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbAPI}&language=en-US`)
    },
    findProviders: function(id){
        return axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${tmdbAPI}`)
    }
}

// findByMovieId: function(id){
//     //     return axios.get("/film/id=" + id)
//     // },