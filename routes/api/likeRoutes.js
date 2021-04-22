const router = require("express").Router();
const likeController = require("../../controllers/likeController");

router
    .route("/")
    .post(likeController.create)
    .delete(likeController.deleteUserLike)

router
    .route("/user/:id")
    .get(likeController.findAllUserLikes)
    

module.exports = router;