const express = require("express");
const officesRoutes = express.Router();

officesRoutes.get("", function(req, res) {
  const { offices } = global;

  const {
    query: { limit = 100, offset = 0 }
  } = req;

  res.json(_.drop(offices, offset).slice(0, limit));
});

officesRoutes.get("/:id", function(req, res) {
  const office = _.find(offices, { id: parseInt(req.params.id, 10) });
  res.json(office);
});

module.exports = officesRoutes;
