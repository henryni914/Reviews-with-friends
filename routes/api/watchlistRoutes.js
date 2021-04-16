const router = require("express").Router();
const watchlistController = require("../../controllers/watchlistController");

router
    .route("/")
    .post(watchlistController.create)

// router
    // .route("/:id")
    // .delete(watchlistController.delete)

// router
//     .route("/user/:id")

module.exports = router;