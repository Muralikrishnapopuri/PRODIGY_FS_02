import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetEmployeeDetailsById } from '../api';

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employee, setEmployee] = useState({});

    const fetchEmployeeDetails = async () => {
        try {
            const data = await GetEmployeeDetailsById(id);
            setEmployee(data);
        } catch (err) {
            alert('Error', err);
        }
    }
    useEffect(() => {
        fetchEmployeeDetails();
    }, [id])

    if (!employee) {
        return <div>Employee not found</div>;
    }

    return (
        <div className="container mt-5 " >
            <div className="card" style={{width:"100%",height:"100vh" ,backgroundImage:`url("/public/back--.jpg")`,backgroundRepeat:"no-repeat",backgroundSize:'cover'}}>
                <div className="card-header">
                <h2> <span style={{color:"white"}}>Employee</span> <span style={{color:"yellow"}}>Info</span></h2>
                </div>
                <div className="card-body" style={{backdropFilter:"blur(10px)"}}>
                    <div className="row mb-3">
                        <div className="col-md-3">
                            <img
                                src={employee.profileImage}
                                alt={employee.name}
                                className="img-fluid rounded"
                            />
                        </div>
                        <div className="col-md-9 text-white" style={{textShadow:"2px 2px 4px black"}}>
                            <h4>{employee.name}</h4>
                            <p><strong>Email:</strong> {employee.email}</p>
                            <p><strong>Phone:</strong> {employee.phone}</p>
                            <p><strong>Department:</strong> {employee.department}</p>
                            <p><strong>Salary:</strong> {employee.salary}</p>
                        </div>
                        <button className="btn btn-dark " onClick={() => navigate('/employee')}>
                        Back to Home
                    </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
