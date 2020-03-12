const express = require("express");
const departmentsRoutes = express.Router();

departmentsRoutes.get("", async function(req, res) {
  const { departments } = global;

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

departmentsRoutes.get("/:id", async function(req, res) {
  const { departments } = global;

  const department = _.find(departments, { id: parseInt(req.params.id, 10) });

  if (!req.query.expand) return res.json(department);

  const expand = Array.isArray(req.query.expand)
    ? req.query.expand
    : [req.query.expand];

  const result = await expandData(department, expand, offices, departments);

  res.json(result);
});

module.exports = departmentsRoutes;
