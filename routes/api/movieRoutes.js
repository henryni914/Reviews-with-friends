const router = require("express").Router();
const movieController = require("../../controllers/movieController")

// http://localhost:3001/api/movie will display all movies in JSON format
// Matches with "/api/movie"
router
    .route("/")
    .get(movieController.findAll)
    .post(movieController.findOrCreate);

// router
//     .route("/:id")
// .get(movieController.find)
//  .put(movieController.update)
// .post();
// .delete(movieController.delete)

module.exports = router;