const chai = require("chai");
const fs = require("fs");
const [checkValidQueryParams] = require("../helpers/requestValidations");
const { exceptionMessages } = require("../helpers/constants");

const expect = chai.expect;
const assert = chai.assert;

let departmentsSource;
let officesSource;
let employeesSource;

before(() => {
  employeesSource = JSON.parse(fs.readFileSync("./assets/mockEmployees.json"));
  departmentsSource = JSON.parse(fs.readFileSync("./assets/departments.json"));
  officesSource = JSON.parse(fs.readFileSync("./assets/offices.json"));
});

describe("Validation helper -> validating query params", () => {
  it("When a query param is not included in supportedQueryParamTypes, Expect to throw an error", () => {
    const queryParams = { limit: 10, notValidParam: "wrong" };
    expect(() => checkValidQueryParams(queryParams)).to.throw(
      exceptionMessages.INVALID_QUERY_PARAM
    );
  });

  it("When all query params are included in supportedQueryParamTypes, Expect not to throw an error", () => {
    const queryParams = {
      limit: 10,
      offset: 100,
      expand: ["department"]
    };
    assert.equal(true, checkValidQueryParams(queryParams));
  });
});
