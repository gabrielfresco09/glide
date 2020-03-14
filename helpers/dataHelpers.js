const _ = require("lodash");
const { getEmployeeById } = require("../api/apiRequests");
const { expandTypes } = require("../helpers/constants");

const expandData = async (entity, expand) => {
  await Promise.all(
    expand.map(async propToExpand => {
      entity = await getPropertyData(propToExpand.split("."), entity);
    })
  );
  return entity;
};

const getPropertyData = async (expandableProps, entity) => {
  const key = expandableProps.shift();
  expandedValues = await expandProp(key, entity[key]);
  entity[key] = expandedValues;
  if (expandableProps.length) {
    entity[key] = await getPropertyData(expandableProps, entity[key]);
  }
  return entity;
};

const expandProp = async (propToExpand, currentPropValue) => {
  switch (propToExpand) {
    case expandTypes.DEPARTMENT:
    case expandTypes.SUPERDEPARTMENT:
      const clonedDepartments = _.cloneDeep(global.departments);
      return _.find(clonedDepartments, { id: currentPropValue });
    case expandTypes.OFFICE:
      const clonedOffices = _.cloneDeep(global.offices);
      return _.find(clonedOffices, { id: currentPropValue });
    case expandTypes.MANAGER:
      const response = await getEmployeeById(currentPropValue);
      return response.data[0];
    default:
      break;
  }
};

module.exports = { expandData };
