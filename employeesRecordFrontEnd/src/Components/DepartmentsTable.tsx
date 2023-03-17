import React, { FC } from 'react'
import { IDepartments } from '../Types/TypeInterfaces'
type departmentsProps  = {
    departments : IDepartments[],
}
export const DepartmentsTable: FC<departmentsProps> = ({departments}) => {
  return (
    <div>
         <table  className="employees__table">
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    {/* <th>Department</th>
                    <th>Job Title</th>
                    <th>Employment Type</th> */}
                    <th>Number of employees </th>
                </tr>
                    {
                        departments.map((dep)=>{
                            return (
                                <tr>
                                    <td>{dep.name}</td>
                                    <td>{dep.location}</td>
                                    <td>{dep.employees.length}</td>
                                </tr>
                            )
                        })
                    }
                
            </table>
    </div>
  )
}
