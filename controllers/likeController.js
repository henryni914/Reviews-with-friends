const db = require("../models")

module.exports = {
    create: function (req, res) {
        db.Like.create(req.body)
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err))
    },
    findAllUserLikes: function (req, res) {
        db.Like.findAll({
            where: {
                UserId: req.params.id
            },
            include: [db.Review]
        })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    },
    deleteUserLike: function (req, res) {
        db.Like.destroy({
            where: req.body
        })
            .then(results => res.json(results))
            .catch(err => res.status(422).json(err));
    }
}