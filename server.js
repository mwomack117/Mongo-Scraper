var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars")

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));
// Connect to the Mongo DB

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/routescontroller.js")

app.use(routes);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});