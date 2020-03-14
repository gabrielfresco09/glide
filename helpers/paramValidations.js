const {
  exceptionMessages,
  EXPAND_SEPARATOR,
  limitValues,
  expandTypes
} = require("./constants");

const checkValidLimit = limit => {
  if (!limit) return;
  if (!isNumber(limit)) throw new Error(exceptionMessages.LIMIT_NOT_VALID);
  if (limit < 1) throw new Error(exceptionMessages.LIMIT_MUST_BE_HIGHER_THAN_0);
  if (limit > limitValues.MAX) throw new Error(exceptionMessages.LIMIT_TO_HIGH);
};

const checkValidOffset = offset => {
  if (offset && !isNumber(offset))
    throw new Error(exceptionMessages.OFFSET_NOT_VALID);
};

const checkExpandValues = expand => {
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

const isNumber = value => !!Number.isInteger(parseInt(value, 10));

module.exports = { checkExpandValues, checkValidLimit, checkValidOffset };
