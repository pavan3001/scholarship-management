import React, { useState, useEffect } from 'react';
import './viewstudent.css';

function ViewStudentsTable() {
    const [students, setStudents] = useState([]);

    // Fetch students from the API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/admin/getusers');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    const handleDelete = async (student) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete the user ${student.name}?`
        );

        if (confirmDelete) {
            try {
                await fetch(`http://localhost:8080/api/admin/deleteuser/${student.id}`, {
                    method: 'DELETE',
                });

                // Remove the deleted student from the state
                setStudents((prevStudents) =>
                    prevStudents.filter((s) => s.id !== student.id)
                );

                alert("Student deleted successfully!");
            } catch (error) {
                console.error("Error deleting student:", error);
                alert("Failed to delete the student. Please try again.");
            }
        }
    };

    return (
        <div className="view-students">
            <div className="container">
                <h2>Users List</h2>
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Aadhar</th>
                            <th>Date of Birth</th>
                            <th>Father's Name</th>
                            <th>Father's Phone</th>
                            <th>Mother's Name</th>
                            <th>Mother's Phone</th>
                            <th>College</th>
                            <th>CGPA</th>
                            <th>User Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan="13">No students available</td>
                            </tr>
                        ) : (
                            students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.aadhar}</td>
                                    <td>{student.dob}</td>
                                    <td>{student.fatherName}</td>
                                    <td>{student.fatherPhone}</td>
                                    <td>{student.motherName}</td>
                                    <td>{student.motherPhone}</td>
                                    <td>{student.college}</td>
                                    <td>{student.cgpa}</td>
                                    <td>{student.userType}</td>
                                    <td>
                                        <button
                                            className="button delete-btn"
                                            onClick={() => handleDelete(student)}
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

export default ViewStudentsTable;
