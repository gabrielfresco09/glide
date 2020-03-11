const _ = require("lodash");

const expandEmployeeData = (
  employee,
  expand,
  officesSource,
  departmentsSource
) => {
  console.log("Employee before", employee);

  expand.forEach(propToExpand => {
    employee[propToExpand] = getPropertyData(
      propToExpand,
      employee[propToExpand],
      officesSource,
      departmentsSource
    );
  });

  console.log("Employee after", employee);
  return employee;
};

const getPropertyData = (
  propToExpand,
  currentPropValue,
  officesSource,
  departmentsSource
) => {
  switch (propToExpand) {
    case "department":
      return _.find(departmentsSource, { id: currentPropValue });
    case "office":
      return _.find(officesSource, { id: currentPropValue });
    default:
      break;
  }
};

module.exports = { expandEmployeeData };
