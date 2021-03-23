const path = require("path");
const router = require("express").Router();
// const filmRoutes = require("./filmRoutes");

// Routes
// router.use("/film", filmRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;