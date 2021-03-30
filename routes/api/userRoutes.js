const router = require("express").Router();
const userController = require("../../controllers/userController")

// http://localhost:3001/api/user will display all users in JSON format
// Matches with "/api/user"
router
  .route("/")
  .get(userController.findAll)
  .post(userController.create);

router
  .route("/:id")
  // .get(userController.find)
  // .put(userController.update)
  // .post();
  .delete(userController.delete)

router
  .route("/:email")
  .get(userController.findAll)


module.exports = router;