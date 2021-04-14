const db = require("../models")

module.exports = {
    create: function (req, res) {
        db.Favorite.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.status(422).json(err))
    },
    findUserFavorites: function (req, res) {
        db.Favorite.findAll({
            where: {
                UserId: req.params.id
            },
            include: [db.Movie]
        })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    },
    delete: function (req, res) {
        db.Favorite.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }
}