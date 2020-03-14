const express = require("express");
const employeesRoutes = express.Router();
const { getEmployeeById, getEmployees } = require("./apiRequests");
const { expandData } = require("../helpers/dataHelpers");

employeesRoutes.get("", async function(req, res) {
  try {
    const { data: employees } = await getEmployees(req.query);
    if (!req.query.expand) return res.json(employees);

    const expandedEmployees = await Promise.all(
      employees.map(employee =>
        expandData(employee, req.query.expand, employees)
      )
    );

    res.json(expandedEmployees);
  } catch (err) {
    console.error("Error trying to fetch employees", err);
    res.status(500).send(err.message);
  }
});

employeesRoutes.get("/:id", async function(req, res) {
  try {
    const response = await getEmployeeById(req.params.id, req.query);
    // Since no expand parameter was found, we avoid searching new data
    const employee = response.data[0];
    if (!req.query.expand) return res.json(employee);

    const result = await expandData(employee, req.query.expand);

    res.json(result);
  } catch (err) {
    console.error(
      `Error trying to fetch employee with id: ${req.params.id}`,
      err
    );
    res.status(500).send(err.message);
  }
});

module.exports = employeesRoutes;
