const axios = require("axios");

const getEmployeeById = (employeeId, params) => {
  return axios.get(process.env.API_URL, { params: { id: employeeId } });
};

const getEmployees = () => axios.get(process.env.API_URL);

module.exports = { getEmployeeById, getEmployees };
