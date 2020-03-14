const express = require("express");
const employeesRoutes = express.Router();
const { getEmployeeById, getEmployees } = require("./apiRequests");
const { expandData } = require("../helpers/dataHelpers");

employeesRoutes.get("", function(req, res) {
  getEmployees(req.query)
    .then(response => res.json(response.data))
    .catch(err => res.end());
});

employeesRoutes.get("/:id", async function(req, res) {
  try {
    const response = await getEmployeeById(req.params.id, req.query);
    // Since no expand parameter was found, we avoid searching new data
    const employee = response.data[0];
    if (!req.query.expand) return res.json(employee);

    const expand = Array.isArray(req.query.expand)
      ? req.query.expand
      : [req.query.expand];

    const result = await expandData(employee, expand);

    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = employeesRoutes;
