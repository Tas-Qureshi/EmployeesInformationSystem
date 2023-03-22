import "../StyleSheets/AddEmployeeSS.css"
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { IEmployees } from '../Types/TypeInterfaces';
import { FC, useMemo } from "react";
type editEmpProps = {
    backToEmployeesList: () => void,
    empData: IEmployees
}

export const EditEmployee: FC<editEmpProps> = ({ empData, backToEmployeesList }) => {

    const schema = yup.object().shape({
        name: yup.string().min(3).required().matches(/^[a-zA-Z ,.'-]+$/, "Name must be characters"),
        jobTitle: yup.string().min(3).required().matches(/^[a-zA-Z ,.'-]+$/, "Job title must be characters"),
        email: yup.string().required().email("Email has to be valid"),
        phoneNumber: yup.number().positive().required(),
        employmentType: yup.string().min(3).required().matches(/^[a-zA-Z ,.'-]+$/, "Employment type must be characters"),
        salary: yup.number().positive().required(),
        location: yup.string().required().matches(/^[a-zA-Z ,.'-]+$/),
        // departmentName: yup.string().required().matches(/^[a-zA-Z ,.'-]+$/),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: useMemo(() => {
            return empData;
        }, [empData])
    });

    const onSubmit = async (formData: IEmployees) => {
        const updatedEmployee = {
            name: formData.name,
            jobTitle : formData.jobTitle,
            email : formData.email,
            phoneNumber: formData.phoneNumber,
            employmentType : formData.employmentType,
            salary : formData.salary,
            location: formData.location,
            departmentName : formData.department.name
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEmployee)
        };
        await fetch(`https://employeeinfomarionsystem.azurewebsites.net/api/Employees/${empData.id}`, requestOptions)
            .then( backToEmployeesList )
    }
    return (
        <div id="employeeIdEditTable" className="employees">
            <h3 className="employees__heading">Edit Employee</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label >Name</label>
                <input type="text"   {...register('name')} />
                <span className="errorMessage">{errors.name?.message?.toString()}</span>

                <label >Job Title</label>
                <input type="text"   {...register('jobTitle')} />
                <span className="errorMessage">{errors.jobTitle?.message?.toString()}</span>

                <label >Email</label>
                <input type="text"  {...register('email')} />
                <span className="errorMessage">{errors.email?.message?.toString()}</span>

                <label >Phone Number</label>
                <input type="text"   {...register('phoneNumber')} />
                <span className="errorMessage">{errors.phoneNumber?.message?.toString()}</span>

                <label >Employment Type</label>
                <input type="text"  {...register('employmentType')} />
                <span className="errorMessage">{errors.employmentType?.message?.toString()}</span>

                <label >Salary</label>
                <input type="text"   {...register('salary')} />
                <span className="errorMessage">{errors.salary?.message?.toString()}</span>

                <label >Location</label>
                <input type="text"   {...register('location')} />
                <span className="errorMessage">{errors.location?.message?.toString()}</span>

                {/* <label >Department</label>
        <input type="text"   {...register('departmentName')} />
        <span className="errorMessage">{errors.department?.message?.toString()}</span> */}

                <div className="form__button">
                    <input id="form__button" type="submit" value='Update Employee' />
                    <button id="form-back-button" onClick={backToEmployeesList} >Back</button>

                </div>
            </form>
        </div>
    )
}
