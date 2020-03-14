const express = require("express");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
const _ = require("lodash");
const employeesRoutes = require("./api/employeesRoutes");
const deparmentsRoutes = require("./api/departmentsRoutes");
const officesRoutes = require("./api/officesRoutes");
const requestValidations = require("./helpers/validations");

dotenv.config();

app.get("*", function(req, res, next) {
  if (req.query.expand) {
    req.query.expand = Array.isArray(req.query.expand)
      ? req.query.expand
      : [req.query.expand];
  }

  try {
    requestValidations.forEach(validation => validation(req.query));
    next();
  } catch (err) {
    console.error("Error during request validation, invalid params", err);
    res.status(400).send(err.message);
  }
});

app.use("/employees", employeesRoutes);
app.use("/departments", deparmentsRoutes);
app.use("/offices", officesRoutes);

app.listen(3000, () => {
  global.departments = JSON.parse(fs.readFileSync("./assets/departments.json"));
  global.offices = JSON.parse(fs.readFileSync("./assets/offices.json"));
  console.log("Server running on port 3000");
});
