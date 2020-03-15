const _ = require("lodash");
const chai = require("chai");
const { expandData } = require("../helpers/dataHelpers");
const { expandTypes, EXPAND_SEPARATOR } = require("../helpers/constants");

const expect = chai.expect;

describe("Data Helper -> expanding property", () => {
  it("When expanding manager on an employee, Expect to see an object on manager property", async () => {
    const expand = [expandTypes.MANAGER];
    let employee = _.cloneDeep(global.employeesSource[5]);
    employee = await expandData(employee, expand, global.employeesSource);
    expect(employee.manager).to.eql(global.employeesSource[3]);
  });

  it("When expanding superdepartment on a department, Expect to see an object on superdepartment property", async () => {
    const expand = [expandTypes.SUPERDEPARTMENT];
    let department = _.cloneDeep(global.departments[4]);
    department = await expandData(department, expand);
    expect(department.superdepartment).to.eql(global.departments[0]);
  });

  it("When expanding multiple properties on an employee, Expect to see each as an object", async () => {
    const expand = [
      expandTypes.MANAGER.concat(EXPAND_SEPARATOR).concat(expandTypes.MANAGER),
      expandTypes.OFFICE,
      expandTypes.DEPARTMENT.concat(EXPAND_SEPARATOR).concat(
        expandTypes.SUPERDEPARTMENT
      )
    ];
    let employee = _.cloneDeep(global.employeesSource[31]);
    employee = await expandData(
      employee,
      expand,
      _.cloneDeep(global.employeesSource)
    );
    expect(employee.manager.manager).to.eql(global.employeesSource[2]);
    expect(employee.department.superdepartment).to.eql(global.departments[2]);
    expect(employee.office).to.eql(global.offices[3]);
  });

  it("When expanding mixed types at the same time, Expect to see an multi-level object property", async () => {
    // this is equal to 'manager.manager.department'
    const expand = [
      expandTypes.MANAGER.concat(EXPAND_SEPARATOR)
        .concat(expandTypes.MANAGER)
        .concat(EXPAND_SEPARATOR)
        .concat(expandTypes.DEPARTMENT)
    ];

    let employee = _.cloneDeep(global.employeesSource[31]);
    employee = await expandData(
      employee,
      expand,
      _.cloneDeep(global.employeesSource)
    );
    expect(employee.manager.manager.department).to.eql(global.departments[3]);
  });
});
