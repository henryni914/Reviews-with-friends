const router = require("express").Router();
const filmController = require("../controllers/filmController")

router
  .route("/id=:id")
  .get(filmController.findById);

  module.exports = router;