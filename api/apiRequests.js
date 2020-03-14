const axios = require("axios");

const getEmployeeById = employeeId =>
  axios.get(process.env.API_URL, { params: { id: employeeId } });

const getEmployees = ({ limit = 100, offset = 0 }) =>
  axios.get(process.env.API_URL, { params: { limit, offset } });

module.exports = { getEmployeeById, getEmployees };
