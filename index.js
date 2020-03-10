const express = require("express");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
const { getEmployeeById, getEmployees } = require("./apiRequests");

dotenv.config();

const departments = JSON.parse(fs.readFileSync("./assets/departments.json"));
const offices = JSON.parse(fs.readFileSync("./assets/offices.json"));

app.get("*", function(req, res, next) {
  //TODO run requests params validations
  next();
});

app.get("/employees", function(req, res) {
  getEmployees()
    .then(response => res.json(response.data))
    .catch(err => res.end());
});

app.get("/employees/:id", function(req, res) {
  getEmployeeById(req.params.id, req.query)
    .then(response => res.json(response.data))
    .catch(err => res.end());
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
