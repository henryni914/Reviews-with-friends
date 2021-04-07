const db = require("../models")

module.exports = {

    create: function (req, res) {
        db.Review.create(req.body)
            .then(dbReview => res.json(dbReview))
            .catch(err => res.status(422).json(err));
    },
    findMovieReviews: function (req, res) {
        db.Review.findAll({
            where: {
                MovieId: req.params.id
            },
            include: [db.User]
        })
            .then(dbReview => res.json(dbReview))
            .catch(err => res.status(422).json(err));
    },
    findUserReviews: function (req, res) {
        db.Review.findAll({
            where: {
                UserId: req.params.id
            },
            include: [db.Movie]
        })
            .then(dbReview => res.json(dbReview))
            .catch(err => res.status(422).json(err));
    },

}