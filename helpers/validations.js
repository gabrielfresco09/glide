const {
  exceptionMessages,
  limitValues,
  expandTypes,
  supportedQueryParamTypes,
  EXPAND_SEPARATOR
} = require("./constants");

const checkValidQueryParams = params => {
  Object.keys(params).forEach(param => {
    if (!supportedQueryParamTypes.includes(param))
      throw new Error(exceptionMessages.INVALID_QUERY_PARAM + " " + param);
  });
};

const checkValidLimit = ({ limit }) => {
  if (limit && limit > limitValues.MAX)
    throw new Error(exceptionMessages.LIMIT_TO_HIGH);
};

const checkExpandValues = ({ expand }) => {
  if (!expand) return;
  expand.forEach(item => {
    item.split(EXPAND_SEPARATOR).forEach(value => {
      checkExpandValue(value);
    });
  });
};

const checkExpandValue = value => {
  const expandAllowedTypes = Object.values(expandTypes);
  if (!expandAllowedTypes.includes(value))
    throw new Error(exceptionMessages.UNRECOGNIZED_EXPAND_VALUE + " " + value);
};

module.exports = [checkValidQueryParams, checkValidLimit, checkExpandValues];
