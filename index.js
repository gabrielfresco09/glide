const express = require("express");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
const _ = require("lodash");
const employeesRoutes = require("./api/employeesRoutes");
const deparmentsRoutes = require("./api/deparmentsRoutes");
const officesRoutes = require("./api/officesRoutes");

dotenv.config();

app.get("*", function(req, res, next) {
  //TODO run requests params validations
  next();
});

app.use("/employees", employeesRoutes);
app.use("/departments", deparmentsRoutes);
app.use("/offices", officesRoutes);

app.listen(3000, () => {
  global.departments = JSON.parse(fs.readFileSync("./assets/departments.json"));
  global.offices = JSON.parse(fs.readFileSync("./assets/offices.json"));
  console.log("Server running on port 3000");
});
