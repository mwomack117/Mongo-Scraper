var express = require("express");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars")

// Require all models
var db = require("./models");

var PORT = 8080;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");


// -------- Routes ------------- //

app.get("/", function (req, res) {
  
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", {items: dbArticle});
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// Route for grabbing saved articles
app.get("/saved", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("saved", {items: dbArticle});
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

// A GET route for scraping the buzzfeed website
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://www.buzzfeed.com/").then(function (response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);
    // var resultArray = [];

    // Now, we grab every h2 within a 'link-gray' class, and do the following:
    $("h2.link-gray").each(function (i, element) {
      // Save an empty result object
      var result = {};

      // Add the text for titles and summary 'p' and href of every link, and save them as properties of the result object
      result.title = $(this)
        .text();
      result.summary = $(this)
        .siblings('p')
        .text();
      result.link = $(this)
        .parents("a")
        .attr("href");

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function (dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
      // var article = new db.Article(result)
      // article.save();
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});


// Clear data
app.get('/clear', function (req, res) {
  db.Article.remove({})
    .then(function (result) {
      // If successful, empty object will be returned
      res.json(result);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
})


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});