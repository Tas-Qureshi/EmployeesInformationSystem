import { useEffect, useState } from "react";
import { getDepartments } from "../Api";
import { IDepartments } from "../Types/TypeInterfaces";
import { DepartmentsTable } from "./DepartmentsTable";
import "../StyleSheets/DeparmentsSS.css";

const Departments = () => {
    const [departments, setDepartments] = useState<IDepartments[]>([]);

    const getData = async () => {
        const departmentsFromApi = await getDepartments();
        setDepartments(departmentsFromApi);
    };
    useEffect(() => {
        getData();
    }, []);
    return ( 
        <div className="departments__main-container">
        <h1>Departments List</h1>
        <div>
            <DepartmentsTable departments={departments}/>
        </div>
        </div>
     );
}
 
export default Departments;