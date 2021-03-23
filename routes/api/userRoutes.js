const router = require("express").Router();
const userController = require("../../controllers/userController")

// Matches with "/api/user"
router
  .route("/")
  .get(userController.findAll)
//   .post(userController.create);

// router
//   .route("/:id")
//   .get(userController.find)
//   .put(userController.update)
// .post(userController.updateCart);

router
  .route("/:email")
  .get(userController.findAll)


module.exports = router;