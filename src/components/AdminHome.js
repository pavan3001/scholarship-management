import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './adminhome.css'; // Create your custom CSS for styling

function AdminHome() {
    return (
        <div className="admin-home">
            <div className="container1">
                <h1>Welcome, Admin</h1>
                <div className="admin-options">
                    <div className="card">
                        <h2>Manage Students</h2>
                        <p>View, add, or update student information.</p>
                        <Link to="/viewstudent" className="button">Go to Students</Link>
                    </div>
                    <div className="card">
                        <h2>Manage Scholarships</h2>
                        <p>Add, edit, or delete scholarships.</p><br/>
                        <Link to="/viewscholarship" className="button">Go to Scholarships</Link>
                    </div>
                    <div className="card">
                        <h2>View Reports</h2>
                        <p>Generate and view reports.</p><br/>
                        <Link to="/applications" className="button">Go to Reports</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
