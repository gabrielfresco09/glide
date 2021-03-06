const express = require("express");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
const _ = require("lodash");
const employeesRoutes = require("./api/employeesRoutes");
const deparmentsRoutes = require("./api/departmentsRoutes");
const officesRoutes = require("./api/officesRoutes");
const requestValidations = require("./helpers/requestValidations");

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
    res.status(400).json({ error: err.message });
  }
});

app.use("/employees", employeesRoutes);
app.use("/departments", deparmentsRoutes);
app.use("/offices", officesRoutes);

app.listen(3000, () => {
  // this should be done asynchronously but since it is a sample file
  // and I know it's small I've handled synchronously to make code simplier
  global.departments = JSON.parse(fs.readFileSync("./assets/departments.json"));
  global.offices = JSON.parse(fs.readFileSync("./assets/offices.json"));
  console.log("Server running on port 3000");
});
