import { FC, useState } from "react";
import { IEmployees } from "../Types/TypeInterfaces";
import "../StyleSheets/EmployeesTableSS.css";
import { EmployeeDetailsModal } from "./EmployeeDetailsModal";

type EmployeesTableProps = {
    employees: IEmployees[],
    employeeOnEdit: (empData: IEmployees) => void,
    deleteEmployee: (id: number) => void,
    searchEmployee: string,
}
const EmployeesTable: FC<EmployeesTableProps> = ({ employees, deleteEmployee, employeeOnEdit, searchEmployee }) => {
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEmployeeData, setShowEmployeeData] = useState(null as IEmployees | null)

    const viewEmployeeDetails = (empData: IEmployees) => {
        setShowEmployeeData(empData);
        setShowViewModal(true);
    }
    const onCancel = () => {
        setShowViewModal(false);
    }

    return (
        <div className="employees">

            <table id="employees__table" className="employees__table">
                <tr>
                    <th>Name</th>
                    <th>Job Title</th>
                    <th>Employment Type</th>
                    <th>Location</th>
                    <th>Department</th>
                    <th></th>
                </tr>
                {
                    employees.filter((emp) => {
                        if (searchEmployee.length > 0) {
                            return emp.name.toLowerCase().match(searchEmployee.toLowerCase()) 
                            || emp.department.name.toLowerCase().match(searchEmployee.toLowerCase());
                        } else {
                            return emp;
                        }
                    }).map(emp => {
                        return (<tr>
                            <td>{emp.name}</td>
                            <td>{emp.jobTitle}</td>
                            <td>{emp.employmentType}</td>
                            <td>{emp.location}</td>
                            <td>{emp.department.name}</td>
                            <td>
                                <button onClick={() => employeeOnEdit(emp)}>Edit</button>
                                &nbsp;
                                <button onClick={() => viewEmployeeDetails(emp)}>Details</button>
                                &nbsp;
                                <button className="employees__table__delete" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                            </td>

                        </tr>);
                    })
                }
            </table>
            {showViewModal && showEmployeeData !== null && <EmployeeDetailsModal onCancel={onCancel} empData={showEmployeeData} />}
        </div>);
}

export default EmployeesTable;