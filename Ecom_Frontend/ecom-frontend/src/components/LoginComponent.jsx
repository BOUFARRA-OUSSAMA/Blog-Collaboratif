import React, { useState } from 'react';
import UserService from '../services/userService'; // Import the UserService
import { useNavigate } from 'react-router-dom';
import '../App.css'

const LoginComponent = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const navigator = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.login(formData);
            if (response.token && response.role) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                localStorage.setItem('id', response.id);
                // Handle successful login (e.g., store user token in local storage, redirect to dashboard)
                console.log('Login successful:', response.data);
                console.log(response.role, response.token);
                navigator('/');
                window.location.reload(); // Reload the page
            } else {
                // Display error message for invalid credentials
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Optionally, you can display a generic error message for other types of errors
        }
    };

    return (
        <div className= "custom-margin container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                </div>
                                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
