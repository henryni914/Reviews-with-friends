const db = require("../models")

module.exports = {
    
    create: function (req, res) {
        db.Review.create(req.body)
            .then(dbReview => res.json(dbReview))
            .catch(err => res.status(422).json(err));
    },
}