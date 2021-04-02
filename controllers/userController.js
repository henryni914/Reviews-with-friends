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
                email: req.params.user.email,
                name: req.params.user.name
            }
            // , defaults: { job: 'Technical Lead JavaScript' } 
        }).then(res => res.spread(function (user, created) {
            console.log(user.get({
                plain: true
            }))
            console.log(created)
        })).catch(err => res.status(422).json(err))

    },
    //     findOrCreate({ where: { email: req.params.id } })
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    delete: function (req, res) {
        db.User.destroy({ where: { id: req.params.id } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User.update({ lastName: "Doe" }, {
            where: {
                id: req.params.id
            }
        })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};