const router = require("express").Router();
const favoriteController = require("../../controllers/favoriteController");

router
    .route("/")
    .post(favoriteController.create)

module.exports = router;