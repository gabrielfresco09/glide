const {
  exceptionMessages,
  EXPAND_SEPARATOR,
  limitValues,
  expandTypes
} = require("./constants");

const checkValidLimit = limit => {
  if (limit !== 0 && !limit) return;
  if (isNaN(limit)) throw new Error(exceptionMessages.LIMIT_NOT_VALID);
  if (limit < 1) throw new Error(exceptionMessages.LIMIT_MUST_BE_HIGHER_THAN_0);
  if (limit > limitValues.MAX) throw new Error(exceptionMessages.LIMIT_TO_HIGH);
};

const checkValidOffset = offset => {
  if (offset && isNaN(offset))
    throw new Error(exceptionMessages.OFFSET_NOT_VALID);
  if (offset < 0) throw new Error(exceptionMessages.OFFSET_TO_LOW);
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

module.exports = { checkExpandValues, checkValidLimit, checkValidOffset };
