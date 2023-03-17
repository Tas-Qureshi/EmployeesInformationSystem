import React, { FC } from 'react'
import "../StyleSheets/EmployeeDetailsModalSS.css"
import { IEmployees } from '../Types/TypeInterfaces'
type employeeDetailsProps ={
    onCancel: () => void,
    empData : IEmployees
}
export const EmployeeDetailsModal: FC<employeeDetailsProps> = ({onCancel, empData}) => {
  return (
    <div id="myModal" className="modal">

  <div className="modal-content">
    <div className="modal-header">
      <span className="close" onClick={onCancel}>&times;</span>
      <h2>Employee Details</h2>
    </div>


    <div className="modal-body">

    <table className='employee-model-table'>
        <tr>
            <th>Name:</th>
            <td>{empData.name}</td>
        </tr>
        <tr>
            <th>Job Title:</th>
            <td>{empData.jobTitle}</td>
        </tr>
        <tr>
            <th>Email:</th>
            <td>{empData.email}</td>
        </tr>

        <tr>
            <th>Phone Number:</th>
            <td>{empData.phoneNumber}</td>
        </tr>
        <tr>
            <th>Employment Type :</th>
            <td>{empData.employmentType}</td>
        </tr>
        <tr>
            <th>Salary :</th>
            <td>{empData.salary}</td>
        </tr>
        <tr>
            <th>Location :</th>
            <td>{empData.location}</td>
        </tr>
        <tr>
            <th>Department :</th>
            <td>{empData.department.name}</td>
        </tr>
    </table>
    </div>


    {/* <div className="modal-footer">
      <h3>Modal Footer</h3>
    </div> */}
  </div>

</div>


  )
}
