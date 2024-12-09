import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link for navigation to edit pages
import './viewscholarships.css'; // Create your custom CSS for styling
import axios from 'axios';

function ViewScholarships() {
    const [scholarships, setScholarships] = useState([]); // State to store scholarships

    // Function to fetch scholarship data from the backend
    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/scholarships/all");
                setScholarships(response.data); // Update state with fetched data
            } catch (error) {
                console.error("Error fetching scholarships:", error);
                alert("Failed to load scholarships.");
            }
        };

        fetchScholarships();
    }, []);

    const handleDelete = async (scholarship) => {
        const confirmAction = window.confirm(`Are you sure you want to delete the scholarship "${scholarship.name}"?`);
        if (!confirmAction) return;

        try {
            // API call to delete the scholarship
            await axios.delete(`http://localhost:8080/api/scholarships/${scholarship.id}`);

            // Remove the deleted scholarship from the state
            setScholarships((prevScholarships) =>
                prevScholarships.filter((item) => item.id !== scholarship.id)
            );

            alert("Scholarship deleted successfully!");
        } catch (error) {
            console.error("Error deleting scholarship:", error);
            alert("Failed to delete the scholarship. Please try again.");
        }
    };

    return (
        <div className="view-scholarships">
            <div className="container">
                <h2>Scholarship Management</h2>
                <table className="scholarships-table">
                    <thead>
                        <tr>
                            <th>Scholarship Name</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.length === 0 ? (
                            <tr>
                                <td colSpan="4">No scholarships available</td>
                            </tr>
                        ) : (
                            scholarships.map((scholarship) => (
                                <tr key={scholarship.id}>
                                    <td>{scholarship.name}</td>
                                    <td>{scholarship.description}</td>
                                    <td>{scholarship.deadline}</td>
                                    <td>
                                        {/* <Link to={`/admin/edit-scholarship/${scholarship.id}`} className="button edit-btn">
                                            Edit
                                        </Link> */}
                                        <button
                                            className="button delete-btn"
                                            onClick={() => handleDelete(scholarship)}
                                        >
                                            Delete
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

export default ViewScholarships;
