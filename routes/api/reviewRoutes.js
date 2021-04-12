const router = require("express").Router();
const reviewController = require("../../controllers/reviewController")

// http://localhost:3001/api/review will display all reviews in JSON format
// Matches with "/api/review"
router
    .route("/")
    // .get(reviewController.findAll);
    .post(reviewController.create);

router
    .route("/:id")
    .get(reviewController.findMovieReviews)
    //  .put(reviewController.update)
    // .post();
    .delete(reviewController.delete)
router
    .route("/user/:id")
    .get(reviewController.findUserReviews)

module.exports = router;