var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load categories page
  app.get("/categories", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("categories", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

    // Load specific categories page
    app.get("/categories/:category?", function(req, res) {
      db.Example.findAll({}).then(function(dbExamples) {
        res.render("categories", {
          category: req.params.category
        });
      });
    });

  // Load services page
  app.get("/services", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("services", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load admin page
  app.get("/admin", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("admin", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
