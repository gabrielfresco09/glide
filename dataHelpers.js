const _ = require("lodash");
const { getEmployeeById } = require("./apiRequests");

const expandData = async (entity, expand, officesSource, departmentsSource) => {
  await Promise.all(
    expand.map(async propToExpand => {
      entity[propToExpand] = await getPropertyData(
        propToExpand,
        entity[propToExpand],
        officesSource,
        departmentsSource
      );
    })
  );
  console.log("Entity", entity);
  return entity;
};

const getPropertyData = async (
  propToExpand,
  currentPropValue,
  officesSource,
  departmentsSource
) => {
  switch (propToExpand) {
    case ("department", "superdepartment"):
      return _.find(departmentsSource, { id: currentPropValue });
    case "office":
      return _.find(officesSource, { id: currentPropValue });
    case "manager":
      const response = await getEmployeeById(currentPropValue);
      return response.data;
    default:
      break;
  }
};

module.exports = { expandData };
