const _ = require("lodash");
const { exceptionMessages } = require("./constants");
const supportedQueryParamTypes = require("./supportedParamTypes");

const checkValidQueryParams = params => {
  Object.keys(params).forEach(param => {
    const supportedParam = _.find(supportedQueryParamTypes, { name: param });
    if (!supportedParam)
      throw new Error(exceptionMessages.INVALID_QUERY_PARAM + " " + param);

    supportedParam.validateValue(params[param]);
  });

  return true;
};

module.exports = [checkValidQueryParams];
