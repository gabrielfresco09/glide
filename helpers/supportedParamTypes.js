const {checkValidLimit,checkValidOffset, checkExpandValues
} = require("./paramValidations");

const supportedQueryParamTypes = [
  { name: "limit", validateValue: checkValidLimit },
  { name: "offset", validateValue: checkValidOffset },
  { name: "expand", validateValue: checkExpandValues }
];

module.exports = supportedQueryParamTypes;
