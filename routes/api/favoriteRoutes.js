const router = require("express").Router();
const favoriteController = require("../../controllers/favoriteController");

router
    .route("/")
    .post(favoriteController.create)

router
    .route("/:id")
    .get(favoriteController.findAll)
    .delete(favoriteController.delete)

router
    .route("/user/:id")
    .get(favoriteController.findUserFavorites)

module.exports = router;