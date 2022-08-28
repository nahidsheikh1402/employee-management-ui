import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import { employeeServiceAPI } from '../services/EmployeeService';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { message } from "antd";
import ViewEmployeeComponent from "./ViewEmployeeComponent";
import Swal from 'sweetalert2';

const ListEmployeeComponent = () => {
    const history = useHistory();
    const [record, setRecord] = useState([])
    const [employeeIdList, setEmployeeIdList] = useState([])
    const [faTrash, setFaTrash] = useState(false)
    const [listRefresh, setListRefresh] = useState(false)
    const [viewPage, setViewPage] = useState(false)
    const [employeeId, setEmployeeId] = useState("")
    const [empId, setempId] = useState("")

    useEffect(() => {
        //To fetch listing of employee api 
        employeeServiceAPI.get(`v1/api/employee/all?employeeId=${empId}`).then((res) => {
            setRecord(res.data.data)
        }
        ).catch(err => console.log('reg err', err))
    }, [listRefresh, empId])

    const viewEmployee = (id, val) => {
        if (val == 1) {
            setEmployeeId(id)
        }
        setViewPage(true);
    }

    const editEmployee = (id) => {
        history.push(`/update-employee/${id}`);
    }

    const addEmployee = () => {
        history.push('/add-employee/_add');
    }

    const columns = [{
        dataField: 'id',
        text: 'Sr No.',
        formatter: (cellContent, row, rowIndex) => (
            <div>
                {rowIndex + 1}
            </div>
        ),
        editable: false
    }, {
        dataField: 'name',
        text: 'Name'
    }, {
        dataField: 'age',
        text: 'Age'
    }, {
        dataField: 'professionName',
        text: 'Profession'
    }, {
        dataField: 'id',
        text: 'Actions',
        formatter: (cellContent, row, rowIndex) => (
            <div >
                <FaEdit onClick={() => editEmployee(row.id)} className={"action-icon"} title="edit" />
                <FaEye onClick={() => viewEmployee(row.id, 1)} className={"action-icon"} title="View" />
                <FaTrash onClick={() => deleteMultipleEmployee(row.id)} className={"action-icon"} title="Delete" />
            </div>
        ),
        editable: false
    },];

    const selectRow = {
        mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            { isSelect ? employeeIdList.push(row.id) : employeeIdList.pop(row.id) }
            {
                employeeIdList.length > 0 ?
                    setFaTrash(true)
                    :
                    setFaTrash(false)
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map((row) => {
                    employeeIdList.push(row.id);
                })
            } else {
                rows.map((row) => {
                    employeeIdList.pop(row.id);
                })
            }
            {
                employeeIdList.length > 0 ?
                    setFaTrash(true)
                    :
                    setFaTrash(false)
            }
        }
    };

    const deleteMultipleEmployee = (id) => {
        Swal.fire({
            title: 'Do you want to delete selected employee?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                //To delete employee
                employeeServiceAPI.delete(`/v1/api/employee/delete?employeeIdList=${id}`).then((res) => {
                    setFaTrash(false);
                    setListRefresh(!listRefresh);
                    setEmployeeIdList([]);
                    Swal.fire({
                        title: 'Successfully deleted',
                        confirmButtonText: 'ok',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/"
                        }
                    })
                }).catch((err) => {
                    message.warning("Unable to delete, something went wrong")
                })
            }
        })

    }

    return (
        <div>
            {!viewPage && (
                <div>
                    <h2 className="text-center">Employee List</h2>
                    <div className="row">

                        <div className="col-md-1">
                            {faTrash && (
                                <div>
                                    <FaTrash onClick={() => deleteMultipleEmployee(employeeIdList)} className={"fa-icon"} title="Delete selected employees" />
                                    <FaEye onClick={() => viewEmployee(employeeIdList, 2)} className={"fa-icon"} title="View selected employees" />
                                </div>
                            )}
                        </div>
                        <div className="col-md-11 ">
                            <button className="btn btn-primary btn-sm float-right" onClick={addEmployee}> Add Employee</button>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable keyField='id' data={record} columns={columns}
                                selectRow={selectRow}
                                striped
                                hover
                                condensed
                            />
                        </div>
                    </div>
                </div>
            )}
            {viewPage && (
                <>
                    {employeeId != "" ? <ViewEmployeeComponent employeeIdList={employeeId} /> : <ViewEmployeeComponent employeeIdList={employeeIdList} />}
                </>
            )}
        </div>
    )

}
export default ListEmployeeComponent;
