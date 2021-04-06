const router = require("express").Router();
const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
const reviewRouters = require("./reviewRoutes");

router.use("/user", userRoutes);
router.use("/movie", movieRoutes);
router.use("/review", reviewRouters)

module.exports = router;