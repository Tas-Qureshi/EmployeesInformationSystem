import {  IDepartments, IEmployees } from "./Types/TypeInterfaces";

  export const getEmployees = async () => {
    const employeesRes = await fetch(`http://localhost:5015/api/Employees`);
    const employeesData = (await employeesRes.json()) as IEmployees[];
    return employeesData;

  };

  export const getDepartments = async () => {
    const departmentsRes = await fetch(`http://localhost:5015/api/Departments`);
    const departmentsData = (await departmentsRes.json()) as IDepartments[];
    return departmentsData;

  };

  export const deleteEmp= async (employeeId: number) => {
    const response = await fetch(
      `
      http://localhost:5015/api/Employees/${employeeId}`,
      {
        method: "DELETE",
      }
    );
};
export const getEmployeeById = async ( employeeId : number ) => {
  const employeeRes = await fetch(`http://localhost:5015/api/Employees/${employeeId}`);
  const employeeData = (await employeeRes.json()) as IEmployees;
  return employeeData;
};



