import React, { useEffect, useState } from 'react';
import UserService from '../services/userService';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css'

const UserComponent = () => {

    const token = localStorage.getItem('token');

    const role = localStorage.getItem('role');

    const navigator = useNavigate();

    const [profileData, setProfileData] = useState(null);


    const {id} = useParams();

    const today = new Date();
    const creationDate = today.toISOString().slice(0, 10);

    const [formData, setFormData] = useState({
        username: '',
        creationDate: creationDate,
        fname: '',
        lname: '',
        email: '',
        address: '',
        tel: '',
        password: '',
        confirmPassword: '', // New password confirmation field
        role: ''
    });

    const [errors, setErrors] = useState({}); // State for validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchProfileData = async () => {
        UserService.getYourProfile(token)
                .then((response) => {
                    // Assuming the response contains user data
                    const userData = response.user; // Adjust this based on the actual response structure
                    // Update the form data with the fetched user data
                    setFormData({
                        username: userData.username,
                        creationDate: userData.creationDate,
                        fname: userData.fname,
                        lname: userData.lname,
                        email: userData.email,
                        address: userData.address,
                        tel: userData.tel,
                        password: userData.password, // Consider whether to include the password here
                        confirmPassword: '', // You might want to clear the confirmPassword field
                        role: userData.role
                    });
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        }
    
        if (!formData.fname.trim()) {
            errors.fname = 'First name is required';
        }
    
        if (!formData.lname.trim()) {
            errors.lname = 'Last name is required';
        }
    
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
        }
    
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }
    
        if (!formData.tel.trim()) {
            errors.tel = 'Telephone is required';
        } else if (!/^\d{10}$/.test(formData.tel)) {
            errors.tel = 'Telephone number must be 10 digits';
        }
    
        if (!formData.role.trim()) {
            errors.role = 'Role is required';
        }
    
        return errors;
    };

    useEffect(() => {
        if(id && role == "ADMIN"){
            UserService.getUser(id, token)
                .then((response) => {
                    // Assuming the response contains user data
                    const userData = response; // Adjust this based on the actual response structure
                    // Update the form data with the fetched user data
                    setFormData({
                        username: userData.username,
                        creationDate: userData.creationDate,
                        fname: userData.fname,
                        lname: userData.lname,
                        email: userData.email,
                        address: userData.address,
                        tel: userData.tel,
                        password: userData.password, // Consider whether to include the password here
                        confirmPassword: '', // You might want to clear the confirmPassword field
                        role: userData.role
                    });
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                });
        }

        if(role == "CUSTOMER"){
            fetchProfileData();
        }
    }, [id]);

    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const confirmed = window.confirm('Are you sure you want to submit the form?');
        if (!confirmed) {
            return; // Do not proceed with form submission if not confirmed
        }
    
        // Validate the form
        const formErrors = validateForm();
    
        // Check if there are any errors
        if (Object.keys(formErrors).length > 0) {
            // Set the errors state to display validation errors
            setErrors(formErrors);
            return;
        }
    
        // Perform form validation here if needed
    
        if (id && role == "ADMIN") {
            console.log(formData);
            // If id exists, it means we're updating an existing user
            formData.password = "";
            UserService.updateUser(id, formData, token)
                .then(response => {
                    console.log('User updated successfully:', formData);
                    navigator('/admin/get-all-users');
                    // Optionally, you can reset the form fields after successful submission
                    setFormData({
                        username: '',
                        fname: '',
                        lname: '',
                        email: '',
                        address: '',
                        tel: '',
                        password: '',
                        confirmPassword: '', // Reset password confirmation field
                        role: ''
                    });
                })
                .catch(error => {
                    // Handle errors from the backend
                    console.error('Error updating user:', error);
                    // Optionally, you can display an error message to the user
                });
        } else if (id && role == "CUSTOMER") {
            console.log(formData);
            // If id exists, it means we're updating an existing user
            formData.password = "";
            console.log(formData);
            UserService.userUpdateUser(id, formData, token)
                .then(response => {
                    console.log('User updated successfully:', formData);
                    navigator('/profile');
                    // Optionally, you can reset the form fields after successful submission
                    setFormData({
                        username: '',
                        fname: '',
                        lname: '',
                        email: '',
                        address: '',
                        tel: '',
                        password: '',
                        confirmPassword: '', // Reset password confirmation field
                        role: ''
                    });
                })
                .catch(error => {
                    // Handle errors from the backend
                    console.error('Error updating user:', error);
                    // Optionally, you can display an error message to the user
                });
        }
    };
    
    
    
    function pageTitle(){
        if(id){
            return <div className="card-header">Update User</div>
        }else{
            return <div className="card-header">Add User</div>
        }
    }
    

    return (
        <div className="custom-margin container mt-5 pb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        {
                            pageTitle()
                        }
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
                                    {errors.fname && <span className="text-danger">{errors.fname}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lname">Last Name:</label>
                                    <input type="text" className="form-control" id="lname" name="lname" value={formData.lname} onChange={handleChange} />
                                    {errors.lname && <span className="text-danger">{errors.lname}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                                    {errors.address && <span className="text-danger">{errors.address}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="tel">Telephone:</label>
                                    <input type="text" className="form-control" id="tel" name="tel" value={formData.tel} onChange={handleChange} />
                                    {errors.tel && <span className="text-danger">{errors.tel}</span>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role:</label>
                                    <select className="form-control" id="role" name="role" value={formData.role} onChange={handleChange}>
                                        <option value="">Select Role</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="CUSTOMER">Customer</option>
                                        {/* Add more options as needed */}
                                    </select>
                                    {errors.role && <span className="text-danger">{errors.role}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComponent;
