import React, { useEffect, useState } from 'react';
import { employeeServiceAPI } from '../services/EmployeeService'


const ViewEmployeeComponent = (props) => {
    const [employee, setEmployee] = React.useState([]);
    const [firstLoad, setFirstLoad] = React.useState(true);
    useEffect(() => {
        employeeServiceAPI.get(`v1/api/employee/selected?employeeIdList=${props.employeeIdList}`).then((res) =>
            setEmployee(res.data.data)
        ).catch(err => console.log('reg err', err))
    }, [])

    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3"><br />
                <h3 className="text-center"> View Employee Details</h3>
                <div className="card-body">
                    {employee.map((e, index) => {
                        return (
                            <div>
                                <h5 className="text-center">{e.name} Information</h5>
                                <table class="table .table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Employee Name</th>
                                            <th className={"text-muted"}>{e.name}</th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Employee Age</th>
                                            <th className={"text-muted"}>{e.age}</th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Profession</th>
                                            <th className={"text-muted"}>{e.professionName}</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ViewEmployeeComponent;
