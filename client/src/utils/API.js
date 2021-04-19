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
    upcomingMovies: function () {
        return axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbAPI}&language=en-US&page=1`)
    },
    topRatedMovies: function () {
        return axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbAPI}&language=en-US&page=1`)
    },
    nowPlayingMovies: function () {
        return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbAPI}&language=en-US&page=1`)
    }


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
    updateUser: function (id, obj) {
        return axios.put(`/api/user/` + id, obj)
    },
    findOrCreateUser: function (user) {
        return axios.post(`/api/user`, user)
    },
    updateUserNickname: function (id, nick) {
        return axios.put(`/api/user/info/` + id, nick)
    },

    // DB Movie functions
    findOrCreateMovie: function (movie) {
        return axios.post(`/api/movie`, movie)
    },

    // DB Comment functions
    createMovieReview: function (review) {
        return axios.post(`/api/review`, review)
    },
    getMovieReviews: function (id) {
        return axios.get(`/api/review/` + id)
    },
    deleteMovieReview: function (id) {
        return axios.delete(`/api/review/` + id)
    },
    editMovieReview: function (id, review) {
        return axios.put(`/api/review/` + id, review)
    },
    getUserReviews: function (id) {
        return axios.get(`/api/review/user/` + id)
    },

    // DB Favorite functions
    addUserFavorite: function (obj) {
        return axios.post(`/api/favorite`, obj)
    },
    deleteFavorite: function (id) {
        return axios.delete(`/api/favorite/` + id)
    },
    getUserFavorites: function (id) {
        return axios.get(`/api/favorite/user/` + id)
    },

    // DB Watchlist functions
    addToWatchList: function (obj) {
        return axios.post(`/api/watchlist`, obj)
    },
    deleteWatchlist: function (id) {
        return axios.delete(`/api/watchlist/` + id)
    },
    getUserWatchlist: function (id) {
        return axios.get(`/api/watchlist/user/` + id)
    },
    editUserWatchlist: function (id, obj) {
        return axios.put(`/api/watchlist/` + id, obj)
    }
};