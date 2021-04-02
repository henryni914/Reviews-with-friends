const db = require("../models")

module.exports = {
    findAll: function (req, res) {
        db.Movie.findAll()
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err));
    },
    findOrCreate: function (req, res) {
        db.Movie.findOrCreate({
            where: {
                title: req.body.title,
                tmdbID: req.body.tmdbID,
                image: req.body.image
            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    delete: function (req, res) {
        db.Movie.destroy({ where: { id: req.params.id } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // update: function (req, res) {
    //     db.Movie.update({ lastName: "Doe" }, {
    //         where: {
    //             id: req.params.id
    //         }
    //     })
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
};