const express = require("express");
const cors = require("cors");
const routes = require("./routes");

// Requiring our models for syncing
var db = require("./models");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Database

// Start the API server

// Sync sequelize models and then start express server
// force true drops the table and recreates 
// set force=false after initial start or else db tables will be wiped
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});