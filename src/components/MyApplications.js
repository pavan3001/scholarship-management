import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyApplications.css'; // Add styling for this component if needed

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmailAndApplications = async () => {
            const userId = localStorage.getItem('userId'); // Get userId from localStorage
            if (!userId) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const emailResponse = await axios.get(`http://localhost:8080/api/users/profile?userId=${userId}`);
                const userEmail = emailResponse.data.email;

                if (!userEmail) {
                    setError("User email not found.");
                    setLoading(false);
                    return;
                }

                const applicationsResponse = await axios.get(`http://localhost:8080/api/applications/email/${userEmail}`);
                setApplications(applicationsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmailAndApplications();
    }, []);

    const handleCancel = async (application) => {
        const confirmCancel = window.confirm(`Are you sure you want to cancel the application for ${application.scholarshipName}?`);
        if (!confirmCancel) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/applications/${application.id}`);
            setApplications((prev) => prev.filter((app) => app.id !== application.id));
            alert("Application canceled successfully!");
        } catch (error) {
            console.error("Error during cancellation:", error.response || error);
            alert("Failed to cancel application. Please try again.");
        }
    };

    return (
        <div className="my-applications">
            <div className="applications-container">
                <h2>My Scholarship Applications</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : applications.length === 0 ? (
                    <p>You have not submitted any applications yet.</p>
                ) : (
                    <table className="applications-table">
                        <thead>
                            <tr>
                                <th>Scholarship Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.scholarshipName}</td>
                                    <td>{application.status}</td>
                                    <td>
                                        <button
                                            disabled={application.status !== 'Applied'} // Disable button if status is not 'Applied'
                                            onClick={() => handleCancel(application)}
                                        >
                                            Cancel Application
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default MyApplications;
