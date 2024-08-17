import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { GetAllEmployees } from '../api';
import EmployeeTable from './EmployeeTable';
import AddNewEmployee from './addNewEmployee';


const EmployeeApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null)
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchEmployees')
        try {
            const data =
                await GetAllEmployees(search, page, limit);
            console.log(data);
            setEmployeesData(data);
        } catch (err) {
            alert('Error', err);
        }
    }
    useEffect(() => {
        fetchEmployees();
    }, [])


    const handleSearch = (e) => {
        fetchEmployees(e.target.value)
    }

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    }
  return (
<div style={{width:"100%",height:"100vh" ,backgroundImage:`url("/public/back--.jpg")`,backgroundRepeat:"no-repeat",backgroundSize:'cover'}} className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
            <div style={{textShadow:"2px 2px 3px black",margin:"2rem",border:"3px solid white",borderTopLeftRadius: "2rem",borderEndEndRadius: "2rem",padding:"1.4rem",backdropFilter:"blur(20px)"}}>
                <h2><span style={{color:"fuchsia"}}>EMPLOYEE</span> <span style={{color:"white"}}>MANAGEMENT</span> <span style={{color:"yellow"}}>SYSTEM</span></h2>
            </div>
            <div  className='w-100 d-flex justify-content-center'>
                <div style={{borderRadius:"2rem",padding:"2rem",width:"80%"}}  className='w-80  bg-dark   p-4' >
                    <div className='d-flex justify-content-between mb-3'>
                        <button className='btn btn-info'
                            onClick={() => setShowModal(true)}>Add New Employee</button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            
                            placeholder="Search Employee"
                            className='form-control w-50 bg-secondary text-white'
                        />
                    </div>
                    <EmployeeTable
                        employees={employeesData.employees}
                        pagination={employeesData.pagination}
                        fetchEmployees={fetchEmployees}
                        handleUpdateEmployee={handleUpdateEmployee}
                    />

                    <AddNewEmployee
                        fetchEmployees={fetchEmployees}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        employeeObj={employeeObj}
                    />
                </div>
            </div>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
  )
}

export default EmployeeApp
