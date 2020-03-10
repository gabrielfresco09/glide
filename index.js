const express = require("express");
const app = express();
const fs = require("fs");

const departments = JSON.parse(fs.readFileSync("./assets/departments.json"));
const offices = JSON.parse(fs.readFileSync("./assets/offices.json"));

app.get("*", function(req, res, next) {
  //TODO run requests params validations
  next();
});

app.get("/employees", function(req, res, next) {
  res.json({});
});

app.get("/employees/:id", function(req, res, next) {
  res.json({});
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
