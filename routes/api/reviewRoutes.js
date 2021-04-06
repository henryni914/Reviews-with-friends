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
    .get(reviewController.find)
//  .put(reviewController.update)
// .post();
// .delete(reviewController.delete)

module.exports = router;