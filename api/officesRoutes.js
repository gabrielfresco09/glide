const express = require("express");
const officesRoutes = express.Router();
const {
  handlePaginationOnLocalSourceData,
  handleFindOnLocalSourceData
} = require("../helpers/dataHelpers");

officesRoutes.get("", function(req, res) {
  res.json(handlePaginationOnLocalSourceData(global.offices, req.query));
});

officesRoutes.get("/:id", function(req, res) {
  res.json(handleFindOnLocalSourceData(offices, req.params.id));
});

module.exports = officesRoutes;
