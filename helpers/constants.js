const expandTypes = {
  DEPARTMENT: "department",
  SUPERDEPARTMENT: "superdepartment",
  OFFICE: "office",
  MANAGER: "manager"
};

const exceptionMessages = {
  CANNOT_EXPAND_NULL_PROPERTY: "Null property can't be expanded"
};
module.exports = { expandTypes, exceptionMessages };
