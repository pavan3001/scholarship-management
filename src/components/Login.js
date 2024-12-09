import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

function Login({ onStudentLogin }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);

            if (response.data.success) {
                onStudentLogin();
                localStorage.setItem('userId', response.data.userId);
                alert("Login Successful!");
                navigate('/studenthome');
            } else {
                setError('Invalid email or password');
                alert("Login Failed! Invalid email or password.");
            }
        } catch (error) {
            console.error('Login failed', error);
            setError('An error occurred. Please try again.');
            alert("Login Failed! An error occurred. Please try again.");
        }
    };

    return (
        <div className='login'>
            <div className="login-container">
                <h2>Welcome Back</h2>
                <p>Please log in to your account</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="button">Log In</button>
                </form>
                <div className="login-links">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    <p><Link to="/forgot">Forgot Password?</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
