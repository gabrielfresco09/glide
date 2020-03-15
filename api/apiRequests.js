const { limitValues } = require("../helpers/constants");
const axios = require("axios");

const getEmployeeById = employeeId =>
  axios.get(process.env.API_URL, { params: { id: employeeId } });

const getEmployees = ({ limit = limitValues.DEFAULT, offset = 0 }) =>
  axios.get(process.env.API_URL, { params: { limit, offset } });

module.exports = { getEmployeeById, getEmployees };
