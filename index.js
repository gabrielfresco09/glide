const express = require("express");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
const _ = require("lodash");
const { getEmployeeById, getEmployees } = require("./apiRequests");
const { expandData } = require("./dataHelpers");

dotenv.config();

const departments = JSON.parse(fs.readFileSync("./assets/departments.json"));
const offices = JSON.parse(fs.readFileSync("./assets/offices.json"));

app.get("*", function(req, res, next) {
  //TODO run requests params validations
  next();
});

app.get("/employees", function(req, res) {
  getEmployees(req.query)
    .then(response => res.json(response.data))
    .catch(err => res.end());
});

app.get("/employees/:id", async function(req, res) {
  try {
    const response = await getEmployeeById(req.params.id, req.query);
    // Since no expand parameter was found, we avoid searching new data
    const employee = response.data[0];
    if (!req.query.expand) return res.json(employee);

    const expand = Array.isArray(req.query.expand)
      ? req.query.expand
      : [req.query.expand];

    const result = await expandData(employee, expand, offices, departments);

    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/departments", async function(req, res) {
  if (!req.query.expand) return res.json(departments);

  const {
    query: { expand, limit = 100, offset = 0 }
  } = req;

  const expandArray = Array.isArray(expand) ? expand : [expand];

  /* I clone the array to avoid modified the original 
  file resource since it's loaded just once on startup */
  const newDepartments = _.drop(_.cloneDeep(departments), offset).slice(
    0,
    limit
  );

  const expandedDepartments = await Promise.all(
    newDepartments.map(department =>
      expandData(department, expandArray, offices, departments)
    )
  );

  res.json(expandedDepartments);
});

app.get("/departments/:id", async function(req, res) {
  const department = _.find(departments, { id: parseInt(req.params.id, 10) });

  if (!req.query.expand) return res.json(department);

  const expand = Array.isArray(req.query.expand)
    ? req.query.expand
    : [req.query.expand];

  const result = await expandData(department, expand, offices, departments);

  res.json(result);
});

app.get("/offices", async function(req, res) {
  const {
    query: { expand, limit = 100, offset = 0 }
  } = req;

  res.json(_.drop(offices, offset).slice(0, limit));
});

app.get("/offices/:id", async function(req, res) {
  const office = _.find(offices, { id: parseInt(req.params.id, 10) });
  res.json(office);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
