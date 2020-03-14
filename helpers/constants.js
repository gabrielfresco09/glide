const expandTypes = {
  DEPARTMENT: "department",
  SUPERDEPARTMENT: "superdepartment",
  OFFICE: "office",
  MANAGER: "manager"
};

const exceptionMessages = {
  LIMIT_TO_HIGH: "Limit can't be higher than 1000",
  LIMIT_NOT_VALID: "Limit value is not valid",
  LIMIT_MUST_BE_HIGHER_THAN_0: "Limit value must be higher thab 0",
  UNRECOGNIZED_EXPAND_VALUE: "Unrecognized expand value",
  INVALID_QUERY_PARAM: "Unrecognized query param",
  OFFSET_NOT_VALID: "Offset value is not valid"
};

const limitValues = {
  MAX: 1000,
  DEFAULT: 100
};

const EXPAND_SEPARATOR = ".";

module.exports = {
  expandTypes,
  exceptionMessages,
  limitValues,
  EXPAND_SEPARATOR
};
