const router = require("express").Router();
const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
const reviewRouters = require("./reviewRoutes");
const favoriteRouters = require("./favoriteRoutes")

router.use("/user", userRoutes);
router.use("/movie", movieRoutes);
router.use("/review", reviewRouters);
router.use("/favorite", favoriteRouters);

module.exports = router;