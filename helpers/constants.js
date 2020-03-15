const expandTypes = {
  DEPARTMENT: "department",
  SUPERDEPARTMENT: "superdepartment",
  OFFICE: "office",
  MANAGER: "manager"
};

const exceptionMessages = {
  LIMIT_TO_HIGH: "Limit can't be higher than 1000",
  LIMIT_NOT_VALID: "Limit must be a number",
  LIMIT_MUST_BE_HIGHER_THAN_0: "Limit must be higher than 0",
  UNRECOGNIZED_EXPAND_VALUE: "Unrecognized expand value",
  INVALID_QUERY_PARAM: "Unrecognized query param",
  OFFSET_NOT_VALID: "Offset must be a number",
  OFFSET_TO_LOW: "Offset must be equal to or higher than 0"
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
