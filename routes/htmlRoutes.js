var db = require("../models");
var Handlebars = require("handlebars");
var moment = require("moment");
var axios = require("axios");

// Handlebars helper to render page specific to category clicked
Handlebars.registerHelper("render_category", function (category, selection, options) {
  console.log(category, selection);
  if (category === selection) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.render("index", {
        msg: "Welcome!",
        users: dbUsers
      });
    });
  });

  // Load categories/:categories page
  app.get("/categories/:category?", function (req, res) {
    console.log(req.params)
    const category = req.params.category ? req.params.category : "feminism";
    const currentDate = moment().format('YYYY-MM-DD');
    var queryURL = 'https://newsapi.org/v2/everything?' +
      'q=' + category +
      '&from=' + currentDate +
      'sortBy=relevance&' +
      'language=en&' +
      'apiKey=' + process.env.API_key;
    // axios call to get api based on the category
    axios.get(queryURL).then(function (result) {
      console.log(result);
      var resultData = result.data.articles;
      for (i = 0; i < resultData.length; i++) {
        resultData[i].publishedAt = moment(resultData[i].publishedAt).format("LL");
      }
      res.render("categories", {
        category: req.params.category, result: resultData
      });
    });
  });

  // Load services page
  app.get("/services", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("services", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load admin page
  app.get("/admin", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      console.log(dbUsers);

      // .map method is taking the dbUsers response and for every user, 
      // it's creating a new parameter that says that any user with
      // a user.role of "volunteer" or "requester" is the isVolunteer or isRequester,
      // which can then be called in the hb's files.
      dbUsers.map(user => user.isVolunteer = user.role === "volunteer");
      dbUsers.map(user => user.isRequester = user.role === "requester");

      res.render("admin", {
        msg: "Welcome!",
        users: dbUsers
      });
    });
  });

  // Load user page and pass in a user by id
  app.get("/user/:id", function (req, res) {
    db.User.findOne({ where: { id: req.params.id } })
      .then(function (dbUser) {
        res.render("user", {
          user: dbUser
        });
      });
  });

  // Load volunteer page and pass in an volunteer by id
  app.get("/volunteer/:id", function (req, res) {
    db.Volunteer.findOne({ where: { id: req.params.id } })
      .then(function (dbVolunteer) {
        res.render("volunteer", {
          volunteer: dbExample
        });
      });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
