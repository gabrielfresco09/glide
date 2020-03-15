const express = require("express");
const _ = require("lodash");
const departmentsRoutes = express.Router();
const {
  expandData,
  handlePaginationOnLocalSourceData,
  handleFindOnLocalSourceData
} = require("../helpers/dataHelpers");

departmentsRoutes.get("", async function(req, res) {
  const { departments } = global;
  const {
    query: { expand }
  } = req;

  if (!expand) return res.json(departments);

  /* Cloning the array to avoid modifiying the original 
  file resource since it's loaded just once on startup */
  const newDepartments = handlePaginationOnLocalSourceData(
    _.cloneDeep(departments),
    req.query
  );

  const expandedDepartments = await Promise.all(
    newDepartments.map(department => expandData(department, expand))
  );

  res.json(expandedDepartments);
});

departmentsRoutes.get("/:id", async function(req, res) {
  const { departments } = global;

  const department = handleFindOnLocalSourceData(departments, req.params.id);

  if (!req.query.expand) return res.json(department);

  const expandedDepartment = await expandData(
    _.cloneDeep(department),
    req.query.expand
  );

  res.json(expandedDepartment);
});

module.exports = departmentsRoutes;
