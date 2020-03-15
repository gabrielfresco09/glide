const fs = require("fs");

before(() => {
    global.employeesSource = JSON.parse(fs.readFileSync("./assets/mockEmployees.json"));
    global.departments = JSON.parse(fs.readFileSync("./assets/departments.json"));
    global.offices = JSON.parse(fs.readFileSync("./assets/offices.json"));
  });