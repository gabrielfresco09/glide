const _ = require("lodash");
const { getEmployeeById } = require("../api/apiRequests");
const { expandTypes, EXPAND_SEPARATOR } = require("../helpers/constants");

/**
 *
 * @param {Object} entity - Main entity requested to the api that will be expanded
 * @param {Array} expand - Array of properties that will be expanded
 * @returns {Object} - Entity with all the requiered properties especified on expand param
 */
const expandData = async (entity, expand, employeesLoaded = []) => {
  await Promise.all(
    expand.map(async propToExpand => {
      entity = await getPropertyData(
        propToExpand.split(EXPAND_SEPARATOR),
        entity,
        employeesLoaded
      );
    })
  );
  return entity;
};

/**
 *
 * @param {Array} expandableProps - Array of props to be expanded
 * @param {Object} entity - Entity which props will be modified
 * @returns {Updated entity with all the required properties expanded}
 */
const getPropertyData = async (expandableProps, entity, employeesLoaded) => {
  const key = expandableProps.shift();
  if (!entity[key]) return entity;
  expandedValues = await expandProp(key, entity[key], employeesLoaded);
  entity[key] = expandedValues;
  if (expandableProps.length) {
    entity[key] = await getPropertyData(
      expandableProps,
      entity[key],
      employeesLoaded
    );
  }
  return entity;
};

/**
 *
 * @param {string} propToExpand - Prop name that will be expanded
 * @param {Number} currentPropValue - Actual prop value, which is going to be updated
 * @returns {Object} - currentPropValue updated with it's own expanded data
 */
const expandProp = async (
  propToExpand,
  currentPropValue,
  employeesLocalSource
) => {
  switch (propToExpand) {
    case expandTypes.DEPARTMENT:
    case expandTypes.SUPERDEPARTMENT:
      const clonedDepartments = _.cloneDeep(global.departments);
      return _.find(clonedDepartments, { id: currentPropValue });
    case expandTypes.OFFICE:
      const clonedOffices = _.cloneDeep(global.offices);
      return _.find(clonedOffices, { id: currentPropValue });
    case expandTypes.MANAGER:
      /* Using already fetched employees to search manager
       to avoid making unnecessary requests, if not found here, then calls the api.*/
      const manager = _.find(employeesLocalSource, { id: currentPropValue });
      if (manager) return manager;
      const response = await getEmployeeById(currentPropValue);
      /* adds the newly found employee to avoid searching 
      for it later on this same request if necessary */
      employeesLocalSource.push(response.data[0]);
      return response.data[0];
    default:
      break;
  }
};

const handlePaginationOnLocalSourceData = (
  sourceData,
  { limit = 100, offset = 0 }
) => _.drop(sourceData, offset).slice(0, limit);

const handleFindOnLocalSourceData = (sourceData, id) =>
  _.find(sourceData, { id: parseInt(id, 10) });

module.exports = {
  expandData,
  handlePaginationOnLocalSourceData,
  handleFindOnLocalSourceData
};
