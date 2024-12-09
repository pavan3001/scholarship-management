import React, { useState, useEffect } from 'react';
import './viewapplications.css'; // Add your CSS styling here
import axios from 'axios'; // For making API requests

function ViewApplicationsTable() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');

    // Fetch all applications from the backend API
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/applications/all");
                console.log(response.data); // Check the data
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
                setError("Failed to load applications.");
            }
        };

        fetchApplications();
    }, []);

    // Handle Approve action
    const handleApprove = async (applicationId) => {
        const confirmAction = window.confirm("Are you sure you want to approve this application?");
        if (!confirmAction) return;

        try {
            await axios.put(`http://localhost:8080/api/applications/${applicationId}/status`, { status: "Approved" });
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === applicationId ? { ...app, status: "Approved" } : app
                )
            );
            alert("Application approved successfully!");
        } catch (error) {
            console.error("Error approving application:", error);
            alert("Failed to approve application.");
        }
    };

    // Handle Reject action
    const handleReject = async (applicationId) => {
        const confirmAction = window.confirm("Are you sure you want to reject this application?");
        if (!confirmAction) return;

        try {
            await axios.put(`http://localhost:8080/api/applications/${applicationId}/status`, { status: "Rejected" });
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === applicationId ? { ...app, status: "Rejected" } : app
                )
            );
            alert("Application rejected successfully!");
        } catch (error) {
            console.error("Error rejecting application:", error);
            alert("Failed to reject application.");
        }
    };

    return (
        <div className="view-applications">
            <div className="container">
                <h2>Student Scholarship Applications</h2>
                {error && <p className="error">{error}</p>}
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Scholarship Name</th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ? (
                            <tr>
                                <td colSpan="5">No applications available</td>
                            </tr>
                        ) : (
                            applications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.email}</td>
                                    <td>{application.scholarshipName}</td>
                                    <td>{application.userName}</td>
                                    <td>{application.status}</td>
                                    <td>
                                        <button
                                            className="button approve-btn"
                                            onClick={() => handleApprove(application.id)}
                                            disabled={application.status === "Approved"}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="button reject-btn"
                                            onClick={() => handleReject(application.id)}
                                            disabled={application.status === "Rejected"}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewApplicationsTable;
