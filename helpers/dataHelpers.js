const _ = require("lodash");
const { getEmployeeById } = require("../api/apiRequests");
const { expandTypes } = require("../helpers/constants");

const expandData = async (entity, expand) => {
  await Promise.all(
    expand.map(async propToExpand => {
      entity = await getPropertyData(propToExpand, entity);
    })
  );
  return entity;
};

// TODO refactor this to allow n levels of nesting
const getPropertyData = async (expandableProps, entity) => {
  const propsToExpand = expandableProps.split(".");

  if (entity[propsToExpand[0]])
    entity[propsToExpand[0]] = await expandProp(
      propsToExpand[0],
      entity[propsToExpand[0]]
    );

  if (propsToExpand.length > 1 && entity[propsToExpand[0]][propsToExpand[1]])
    entity[propsToExpand[0]][propsToExpand[1]] = await expandProp(
      propsToExpand[1],
      entity[propsToExpand[0]][propsToExpand[1]]
    );

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
