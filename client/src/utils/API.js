import axios from "axios"

const tmdbAPI = process.env.REACT_APP_TMDB_API_KEY

export default {

    searchMovies: function (search) {
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbAPI}&query=${search}`)
    },
    popularMovies: function () {
        return axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbAPI}&language=en-US`)
    },
    findByMovieId: function (id) {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbAPI}&language=en-US&append_to_response=watch/providers,credits,similar,videos`)
    },
    findProviders: function (id) {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${tmdbAPI}`)
    },


    // DB User functions

    // findAll: function () {
    //     return axios.get(`/api/user`);
    // },
    // create: function(user){
    //     return axios.post(`/api/user`, user)
    // },
    deleteUser: function (id) {
        return axios.delete(`/api/user/` + id)
    },
    updateUser: function (id) {
        return axios.put(`/api/user/` + id)
    },
    findOrCreateUser: function (user) {
        return axios.post(`/api/user`, user)
    },



    // DB Movie functions

    findorCreateMovie: function (movie) {
        return axios.post(`/api/movie`, movie)
    },
};