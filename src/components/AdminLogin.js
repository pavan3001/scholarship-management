import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminlogin.css';
import axios from 'axios';

function AdminLogin({ onAdminLogin }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/api/admin/login', formData);
            
            if (response.status === 200) {
                onAdminLogin();
                alert('Admin Login Successful!'); // Alert on successful login
                setTimeout(() => {
                    navigate('/adminhome'); // Navigate to the admin home page after the alert
                }, 2000);
            } else {
                setError('Invalid credentials');
                alert('Login Failed! Invalid credentials.'); // Alert on failure
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('Login failed. Please try again.');
            alert('Login Failed! Please try again.'); // Alert on failure
        }
    };

    return (
        <div className='admin-login'>
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="button" type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default AdminLogin;