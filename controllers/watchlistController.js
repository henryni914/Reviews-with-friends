const db = require("../models")

module.exports = {
    create: function (req, res) {
        db.Watchlist.create(req.body)
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    },
    findUserWatchlist: function (req, res) {
        db.Watchlist.findAll({
            where: {
                UserId: req.params.id
            },
            include: [db.Movie]
        })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    }
}