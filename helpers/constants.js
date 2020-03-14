const expandTypes = {
  DEPARTMENT: "department",
  SUPERDEPARTMENT: "superdepartment",
  OFFICE: "office",
  MANAGER: "manager"
};

const exceptionMessages = {
  LIMIT_TO_HIGH: "Limit can't be higher than 1000",
  UNRECOGNIZED_EXPAND_VALUE: "Unrecognized expand value",
  INVALID_QUERY_PARAM: "Unrecognized query param"
};

const limitValues = {
  MAX: 1000,
  DEFAULT: 100
};

const supportedQueryParamTypes = ["limit", "offset", "expand"];

const EXPAND_SEPARATOR = ".";

module.exports = {
  expandTypes,
  exceptionMessages,
  limitValues,
  supportedQueryParamTypes,
  EXPAND_SEPARATOR
};
