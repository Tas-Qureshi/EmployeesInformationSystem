import {  IDepartments, IEmployees } from "./Types/TypeInterfaces";

  export const getEmployees = async () => {
    const employeesRes = await fetch(`https://employeeinfomarionsystem.azurewebsites.net/api/Employees`);
    const employeesData = (await employeesRes.json()) as IEmployees[];
    return employeesData;

  };

  export const getDepartments = async () => {
    const departmentsRes = await fetch(`https://employeeinfomarionsystem.azurewebsites.net/api/Departments`);
    const departmentsData = (await departmentsRes.json()) as IDepartments[];
    return departmentsData;

  };

  export const deleteEmp= async (employeeId: number) => {
    const response = await fetch(
      `
      https://employeeinfomarionsystem.azurewebsites.net/api/Employees/${employeeId}`,
      {
        method: "DELETE",
      }
    );
};
export const getEmployeeById = async ( employeeId : number ) => {
  const employeeRes = await fetch(`https://employeeinfomarionsystem.azurewebsites.net/api/Employees/${employeeId}`);
  const employeeData = (await employeeRes.json()) as IEmployees;
  return employeeData;
};



