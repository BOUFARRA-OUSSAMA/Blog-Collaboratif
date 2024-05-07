// RegisterComponent.jsx
import React, { useState } from 'react';
import UserService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {

    const navigator = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        fname: '',
        lname: '',
        email: '',
        address: '',
        tel: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrors({
                ...errors,
                confirmPassword: 'Passwords do not match',
            });
            return;
        }
        try {
            const userData = { ...formData, role: 'CUSTOMER' };
            const response = await UserService.register(userData);
            console.log(response.message);
            if (response.message === "User") {
                setErrors({
                    ...errors,
                    username: 'Username already exists',
                    email: '', // Clear email error if present
                });
            } else if (response.message === "Email") {
                setErrors({
                    ...errors,
                    email: 'Email already exists',
                    username: '', // Clear username error if present
                });
            } else if (response.message === "User and Cart saved successfully!") {
                console.log('Registration successful:', response);
                navigator('/login');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
                                    {errors.username && <span className="text-danger">{errors.username}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fname">First Name:</label>
                                    <input type="text" className="form-control" id="fname" name="fname" value={formData.fname} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lname">Last Name:</label>
                                    <input type="text" className="form-control" id="lname" name="lname" value={formData.lname} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tel">Telephone:</label>
                                    <input type="text" className="form-control" id="tel" name="tel" value={formData.tel} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;
