const router = require("express").Router();
const userRoutes = require("./userRoutes");
const movieRoutes = require("./movieRoutes");
const reviewRouters = require("./reviewRoutes");
const favoriteRouters = require("./favoriteRoutes");
const watchlistRouters = require("./watchlistRoutes");
const likeRouters = require("./likeRoutes");

router.use("/user", userRoutes);
router.use("/movie", movieRoutes);
router.use("/review", reviewRouters);
router.use("/favorite", favoriteRouters);
router.use("/watchlist", watchlistRouters);
router.use("/like", likeRouters);

module.exports = router;