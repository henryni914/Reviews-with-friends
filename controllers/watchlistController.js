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
    },
    editUserWatchlist: function (req, res) {
        db.Watchlist.update({
            completed: req.body.completed
        }, {
            where: {
                id: req.params.id
            }
        }
        )
    },
    delete: function (req, res) {
        db.Watchlist.destroy({
            where: {
                id: req.params.id
            }
        })
    }
}