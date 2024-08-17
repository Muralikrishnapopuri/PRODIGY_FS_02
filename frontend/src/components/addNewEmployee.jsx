import React, { useEffect, useState } from 'react'
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';

function AddNewEmployee({
    showModal, setShowModal, fetchEmployees, employeeObj
}) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (employeeObj) {
            setEmployee(employeeObj);
            setUpdateMode(true);
        }
    }, [employeeObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        })
    }

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode ?
                await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);
            console.log('create OR update ', success, message);
            if (success) {
                notify(message, 'success')
                window.location.reload();
            } else {
                notify(message, 'error')
            }
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Employee', 'error')
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
    }
    return (
        < div className={`modal ${showModal ? 'd-block' : ''}`
        } tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog " role="document">
                <div className="modal-content " style={{backdropFilter:"blur(2rem)",background:"transparent"}}>
                    <div className="modal-header">
                        <h3 className="modal-title text-white fw-bold"> {
                            updateMode ? 'Update Employee' : 'Add Employee'
                        }</h3>
                        <button type="button" className="btn-close"
                            onClick={() => handleModalClose()}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddEmployee}>
                            <div className="mb-3">
                                <label className="form-label text-white">Name</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-white">Email</label>
                                <input
                                    type="email"
                                    className="form-control bg-dark text-white"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-white">Phone</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white"
                                    name="phone"
                                    value={employee.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-white">Department</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-white">Salary</label>
                                <input
                                    type="text"
                                    className="form-control bg-dark text-white"
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-white">Profile Image</label>
                                <input
                                    type="file"
                                    className="form-control bg-dark text-white"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit"
                                className="btn btn-success">
                                {updateMode ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default AddNewEmployee