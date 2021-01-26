const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  console.log(req.body)
  let burgerStatus;
  if(req.body.devoured === "true"){
    burgerStatus = 1;
  } else {
    burgerStatus = 0;
  }
  burger.update({
    devoured: Boolean(burgerStatus)
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
