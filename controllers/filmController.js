const tmdbApiKey = process.env.TMDB_API_KEY

module.exports = {
    findById: function (req, res) {
        `https://api.themoviedb.org/3/movie/`+req.params.id+`?api_key=${tmdbApiKey}&language=en-US`
    }
}