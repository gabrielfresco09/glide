const chai = require("chai");
const [checkValidQueryParams] = require("../helpers/requestValidations");
const { exceptionMessages } = require("../helpers/constants");

const expect = chai.expect;

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
    expect(() => checkValidQueryParams(queryParams)).to.not.throw;
  });

  it("When limit is higher than 1000, Expect to throw an error", () => {
    const queryParams = { limit: 5000 };
    expect(() => checkValidQueryParams(queryParams)).to.throw(
      exceptionMessages.LIMIT_TO_HIGH
    );
  });

  it("When limit is not a number, Expect to throw an error", () => {
    const queryParams = { limit: "wrong type" };
    expect(() => checkValidQueryParams(queryParams)).to.throw(
      exceptionMessages.LIMIT_NOT_VALID
    );
  });

  it("When limit is lower than 1, Expect to throw an error", () => {
    const queryParams = { limit: 0 };
    expect(() => checkValidQueryParams(queryParams)).to.throw(
      exceptionMessages.LIMIT_MUST_BE_HIGHER_THAN_0
    );
  });

  it("When offset is not a number, Expect to throw an error", () => {
    const queryParams = { offset: "wrong type" };
    expect(() => checkValidQueryParams(queryParams)).to.throw(
      exceptionMessages.OFFSET_NOT_VALID
    );
  });

  it("When expand values are not included in expandTypes, Expect to throw an error", () => {
    const queryParams = { expand: ["department", "manager.wrong"] };
    expect(() => checkValidQueryParams(queryParams)).to.throw(
      exceptionMessages.UNRECOGNIZED_EXPAND_VALUE + " wrong"
    );
  });
});
