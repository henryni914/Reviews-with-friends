const db = require("../models")

module.exports = {
    findAll: function (req, res) {
        db.User.findAll()
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.User.create(req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    findOrCreate: function (req, res) {
        db.User.findOrCreate({
            where: {
                email: req.body.email,
                name: req.body.name
            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    delete: function (req, res) {
        db.User.destroy({ where: { id: req.params.id } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User.update({
            dateJoined: req.body.dateJoined,
            nickname: req.body.nickname
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateNickname: function (req, res) {
        db.User.update({
            nickname: req.body.nickname
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};