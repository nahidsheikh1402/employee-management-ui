import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import Inputs from "../components/common/Input";
import Button from "../components/common/Button";
import SelectBox from "../components/common/Select";
import { employeeServiceAPI } from '../services/EmployeeService';
import * as Yup from "yup";
import { message } from "antd";
import Swal from 'sweetalert2';

const CreateEmployeeComponent = (props) => {
    const [employeeProfession, setEmployeeProfession] = useState([])
    const history = useHistory();
    const [formRender, setFormRender] = React.useState(false);
    const [selectDefaultValue, setSelectDefaultValue] = React.useState("");
    const id = props.match.params.id;

    useEffect(() => {
        //To fetch profession list 
        employeeServiceAPI.get(`v1/api/employee-profession/active/all`).then((res) =>
            setEmployeeProfession(res.data.data.map((employeeProfession) => {
                return { label: employeeProfession.professionName, value: employeeProfession.id }
            }))
        ).catch(err => console.log('reg err', err))
    }, [])

    useEffect(() => {
        if (id !== '_add') {
            //To fetch employee detail by its id for update  
            employeeServiceAPI.get(`v1/api/employee/${id}`).then((res) => {
                console.log(res.data.data);
                formik.values.name = res.data.data.name;
                formik.values.age = res.data.data.age;
                formik.values.professionId = res.data.data.professionId;
                setSelectDefaultValue(res.data.data.professionName)
                setFormRender(true)
            }
            ).catch(err => console.log('reg err', err))
        } else {
            setFormRender(true)
        }
    }, [])

    const cancel = () => {
        history.push('/employees');
    }

    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            professionId: ""
        },
        onSubmit: (values, { resetForm }) => {
            if (id === '_add') {
                //To create employee 
                employeeServiceAPI.post('/v1/api/employee', {
                    name: values.name,
                    age: values.age,
                    professionId: values.professionId
                })
                    .then((res) => {
                        Swal.fire({
                            title: 'Successfully created',
                            confirmButtonText: 'ok',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                history.push('/employees');
                            }
                        })
                        resetForm();
                    }).catch((err) => { message.error(err.message); })
            } else {
                //To update employee 
                employeeServiceAPI.put(`/v1/api/employee/${id}`, {
                    name: values.name,
                    age: values.age,
                    professionId: values.professionId
                })
                    .then((res) => {
                        Swal.fire({
                            title: 'Successfully updated',
                            confirmButtonText: 'ok',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                history.push('/employees');
                            }
                        })
                        resetForm();
                    }).catch((err) => { message.error(err.message); })
            }
        },
        //validation for employee
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Employee name is required."),
            age: Yup
                .number()
                .required("Employee age is required.")
                .min(18, "You must be at least 18 years.")
                .max(60, "You must be at most 60 years."),
            professionId: Yup.string().required("Profession is Required.")
        }),
    });
    const {
        values,
        touched,
        handleChange,
        errors,
        isValid,
        handleSubmit,
        setFieldValue,
    } = formik;
    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"><br />
                        {
                            getTitle()
                        }
                        {formRender && (
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label> Employee Name: </label>
                                        <Inputs
                                            id={"EmployeeName"}
                                            name={"name"}
                                            type={"text"}
                                            placeholder={"Employee Name"}
                                            style={{ width: "50%" }}
                                            onChange={handleChange}
                                            value={values.name}
                                        />
                                        {touched.name && errors.name && (
                                            <div className="error text-red-600">{errors.name}</div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label> Employee Age: </label>
                                        <Inputs
                                            id={"EmployeeAge"}
                                            name={"age"}
                                            type={"number"}
                                            placeholder={"Employee Age"}
                                            style={{ width: "50%" }}
                                            onChange={handleChange}
                                            value={values.age}
                                        />
                                        {touched.age && errors.age && (
                                            <div className="error text-red-600">{errors.age}</div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label> Profession: </label>
                                        <SelectBox
                                            name={"professionId"}
                                            onChange={(selectedOption) => {
                                                formik.setFieldValue(
                                                    "professionId",
                                                    selectedOption.value
                                                );
                                            }}
                                            placeholder="Profession"
                                            optionFilterProp="children"
                                            options={employeeProfession}
                                            defaultValue={values.professionId}
                                            defaultLable={selectDefaultValue}
                                        />
                                        {touched.professionId && errors.professionId && (
                                            <div className="error text-red-600">{errors.professionId}</div>
                                        )}
                                    </div>
                                    <Button
                                        type={"submit"}
                                        className={"btn btn-success"}
                                    >
                                        {id === '_add' ? <>Submit</> : <>Update</>}
                                    </Button>
                                    <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>

                                </form>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
};

export default CreateEmployeeComponent;
