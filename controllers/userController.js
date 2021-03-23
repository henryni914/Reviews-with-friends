const db = require("../models")

module.exports = {
    findAll: function (req, res) {
        db.User.findAll()
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err));
    },
    findOrCreate: function (req, res) {
        db.User.findOrCreate({ where: { email: req.params.id } })
            // .spread(function (userResult, created) {
            //     // userResult is the user instance
            //     res.json(userResult)
            //     if (created) {
            //         // created will be true if a new user was created
            //     }
            // })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};