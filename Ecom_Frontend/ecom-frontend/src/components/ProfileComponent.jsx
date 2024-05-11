import React, { useState, useEffect } from 'react';
import UserService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ProfileComponent = () => {
    const [profileData, setProfileData] = useState(null);
    const [profileData2, setProfileData2] = useState(null);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
        fetchProfileData();
        fetchProfileData2();
    }, []);

    const token = localStorage.getItem('token');

    const fetchProfileData = async () => {
        try {
            const profile = await UserService.getYourProfile(token);
            console.log(profile);

            setProfileData(profile.user);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const fetchProfileData2 = async () => {
        UserService.getYourProfile(token)
                .then((response) => {
                    // Assuming the response contains user data
                    const userData = response.user; // Adjust this based on the actual response structure
                    // Update the form data with the fetched user data
                    setProfileData2({
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

    const handleShowChangePassword = () => {
        setShowChangePassword(true);
    };

    const handleCancelChangePassword = () => {
        setShowChangePassword(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setSuccessMessage('');
    };

    const handleSubmitChangePassword = async () => {
        try {
            // Check if the old password matches the user's password
            const testData = profileData;
            testData.password = oldPassword;
            const response = await UserService.login(testData);
            if (response.token && response.role) {
                // Check if the new password matches the confirm password
                if (newPassword === confirmPassword) {
                    // Call the API to update the user's password
                    profileData2.password = newPassword;
                    console.log(profileData2);
                    const updateResponse = await UserService.userUpdateUser(testData.id, profileData2, token);
                    if (updateResponse) {
                        setSuccessMessage('Password updated successfully!');
                        setShowChangePassword(false);
                        setOldPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                        setPasswordError('');
                    } else {
                        setPasswordError(updateResponse.message);
                    }
                } else {
                    setPasswordError('New password and confirm password do not match.');
                }
            } else {
                setPasswordError('Old password is incorrect.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setPasswordError('An error occurred while updating password. Please try again.');
        }
    };

    const updateUser = (userId) => {
        // Navigate to the update user form with the user ID as a URL parameter
        navigator(`/user/update-user/${userId}`);
    };

    return (
        <div className="custom-margin container mt-5">
            <h2 className="mb-4">Your Profile</h2>
            {profileData ? (
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Username:</strong> {profileData.username}</p>
                                <p><strong>First Name:</strong> {profileData.fname}</p>
                                <p><strong>Last Name:</strong> {profileData.lname}</p>
                                <p><strong>Email:</strong> {profileData.email}</p>
                                <p><strong>Address:</strong> {profileData.address}</p>
                                <p><strong>Telephone:</strong> {profileData.tel}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <div className="mt-4">
                <div className="d-flex">
                <button className="btn btn-primary mr-2" onClick={() => updateUser(profileData.id)}>Modify Info</button>
                    {!showChangePassword && (
                        <button onClick={handleShowChangePassword} className="btn btn-primary">Change Password</button>
                    )}
                </div>
                {showChangePassword && (
                    <div className="mt-3">
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {passwordError && <p className="text-danger">{passwordError}</p>}
                        {successMessage && <p className="text-success">{successMessage}</p>}
                        <div className="mt-3">
                            <button onClick={handleSubmitChangePassword} className="btn btn-primary mr-2">Submit</button>
                            <button onClick={handleCancelChangePassword} className="btn btn-secondary">Cancel</button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileComponent;
