const _ = require("lodash");
const { getEmployeeById } = require("./api/apiRequests");

const expandData = async (entity, expand) => {
  await Promise.all(
    expand.map(async propToExpand => {
      entity[propToExpand] = await getPropertyData(
        propToExpand,
        entity[propToExpand]
      );
    })
  );
  console.log("Entity", entity);
  return entity;
};

const getPropertyData = async (propToExpand, currentPropValue) => {
  switch (propToExpand) {
    case "department" || "superdepartment":
      return _.find(global.departments, { id: currentPropValue });
    case "office":
      return _.find(global.offices, { id: currentPropValue });
    case "manager":
      const response = await getEmployeeById(currentPropValue);
      return response.data;
    default:
      break;
  }
};

module.exports = { expandData };
