require("dotenv").config();

var db = require("../models");
var axios = require("axios");
var moment = require('moment');

module.exports = function(app) {

  // Users ============================================================

  // User findAll query
  // Set value to an array of the models we want to include in a left outer join
  // In this case, just db.UserServices
  app.get("/api/users", function(req, res) {
    db.User.findAll({ include: [db.UserServices] }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // User findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.UserServices
  app.get("/api/users/:id", function (req, res) {
    db.User.findOne({ where: { id: req.params.id }, include: [db.UserServices] })
      .then(function (dbUser) {
        res.json(dbUser);
      });
  });

  // Create new User
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete User
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });


  // Volunteers ====================================================

  // Get all volunteers
  app.get("/api/volunteers", function(req, res) {
    db.Volunteer.findAll({}).then(function(dbVolunteers) {
      res.json(dbVolunteers);
    });
  });

  // Create new Volunteer
  app.post("/api/volunteers", function(req, res) {
    db.Volunteer.create(req.body).then(function(dbVolunteers) {
      res.json(dbVolunteers);
    });
  });

  // Delete Volunteer
  app.delete("/api/volunteers/:id", function(req, res) {
    db.Volunteer.destroy({ where: { id: req.params.id } })
      .then(function(dbVolunteers) {
        res.json(dbVolunteers);
      });
  });

  // EXAMPLES start =================================================
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  // EXAMPLES end ==================================================


// ------------ Categories API Routes ------------//  
  // Get random articles when category page is loaded
  app.get("/categories", function(req, res) {
    const currentDate = moment().format('YYYY-MM-DD');
    var queryURL = 'https://newsapi.org/v2/everything?' +
      'q=feminism' +
      '&from=' + currentDate +
      'sortBy=relevance&' +
      'language=en&' +
      'apiKey=' + process.env.API_key;
    // axios call to get api based on the category
    axios.get(queryURL).then(function(result) {
      console.log(result);
      var resultData = result.data.articles;
      for (i = 0; i < resultData.length; i++) {
        resultData[i].publishedAt = moment(resultData[i].publishedAt).format("LL");
      }
      res.render("categories", {result: resultData})
    });
  });  

  // Get articles by specific category
    app.get("/api/categories/:category", function(req, res) {
      const category = req.params.category;
      const currentDate = moment().format('YYYY-MM-DD');
      var queryURL = 'https://newsapi.org/v2/everything?' +
        'q=' + category +
        '&from=' + currentDate +
        'sortBy=relevance&' +
        'language=en&' +
        'apiKey=' + process.env.API_key;
      // axios call to get api based on the category
      axios.get(queryURL).then(function(result) {
        console.log(result);
        var resultData = result.data.articles;
        for (i = 0; i < resultData.length; i++) {
          resultData[i].publishedAt = moment(resultData[i].publishedAt).format("LL");
        }
        res.render("categories", {result: resultData})
      });
    });

// ------------ Index API Routes ------------//  
  
  // Get latest posts
  app.get("/", function(req, res) {
    const currentDate = moment().format('YYYY-MM-DD');
    var queryURL = 'https://newsapi.org/v2/everything?' +
      'q=female+leaders' +
      '&from=' + currentDate +
      'sortBy=relevance&' +
      'language=en&' +
      'apiKey=' + process.env.API_key;
    // axios call to get api based on the category
    axios.get(queryURL).then(function(result) {
      console.log(result);
      var resultData = result.data.articles;
      for (i = 0; i < resultData.length; i++) {
        resultData[i].publishedAt = moment(resultData[i].publishedAt).format("LL");
      }
      res.render("index", {result: resultData})
    });
  });

    // Get articles by specific category
    app.get("/api/index/:category", function(req, res) {
      const category = req.params.category;
      const currentDate = moment().format('YYYY-MM-DD');
      var queryURL = 'https://newsapi.org/v2/everything?' +
        'q=' + category +
        '&from=' + currentDate +
        'sortBy=relevance&' +
        'language=en&' +
        'apiKey=' + process.env.API_key;
      // axios call to get api based on the category
      axios.get(queryURL).then(function(result) {
        console.log(result);
        var resultData = result.data.articles;
        for (i = 0; i < resultData.length; i++) {
          resultData[i].publishedAt = moment(resultData[i].publishedAt).format("LL");
        }
        res.render("categories", {result: resultData})
      });
    });

};
