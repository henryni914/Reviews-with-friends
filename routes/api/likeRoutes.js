const router = require("express").Router();
const likeController = require("../../controllers/likeController");

router
    .route("/")
    .post(likeController.create)

module.exports = router;