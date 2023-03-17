import { createContext, useContext, useEffect, useState } from "react";
import { deleteEmp, getEmployeeById, getEmployees } from "../Api";
import { IEmployees, PageEnum } from "../Types/TypeInterfaces";
import EmployeesTable from "./EmployeesTable";
import "../StyleSheets/EmployeesSS.css";
import { AddEmployee } from "./AddEmployee";
import { EmployeeDetailsModal } from "./EmployeeDetailsModal";
import { EditEmployee } from "./EditEmployee";

const Employees = () => {
    const [employees, setEmployees] = useState<IEmployees[]>([]);
    const [searchEmployee, setSearchEmployee] = useState("");
    const [showPage, setShowPage] = useState(PageEnum.list)
    const [dataToEdit, setDataToEdit] = useState(null as null | IEmployees);

    const onAddEmployeeClickHnd = () => {
        setShowPage(PageEnum.add);
    }
    const backToEmployeesList = () => {
        setShowPage(PageEnum.list);
    }

    const editEmployeeData = (empData: IEmployees) => {
        setShowPage(PageEnum.edit);
        setDataToEdit(empData);
    }

    const getData = async () => {
        const employeesFromApi = await getEmployees();
        setEmployees(employeesFromApi);
    };

    const deleteEmployee = async (id: number) => {
        await deleteEmp(id);
        setEmployees(employees.filter(emp => {
            return emp.id !== id;
        }))
    };

    const handleChange = (e: any) => {
        setSearchEmployee(e.target.value);
    };

    useEffect(() => {
        getData();
    }, [employees]);

    return (
        <div className="employees-container">
            {
                showPage === PageEnum.list && (
                    <div className="employees-container__table">
                        <div className="employees__header">
                        <button className="emmployees-btn" onClick={onAddEmployeeClickHnd} >Add Employee</button>
                        <h1 className="emp__heading">Employees List</h1>

                            <input className="employees-container__table-search-input"
                                type="search"
                                placeholder="Search here"
                                onChange={handleChange}
                                value={searchEmployee} />

                        </div>
                        <div className="emplyees-container__table-component">
                        <EmployeesTable employees={employees} deleteEmployee={deleteEmployee} employeeOnEdit={editEmployeeData} searchEmployee={searchEmployee} />
                        </div>
                    </div>
                )}

            {
                showPage === PageEnum.add && <AddEmployee backToEmployeesList={backToEmployeesList} />
            }
            {
                showPage === PageEnum.edit && < EditEmployee backToEmployeesList={backToEmployeesList} empData={dataToEdit as IEmployees} />
            }
        </div>
    );
}

export default Employees;