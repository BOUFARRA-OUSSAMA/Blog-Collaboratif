import React, { useState, useEffect } from 'react';
import UserService from '../services/userService';

const ProfileComponent = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const token = localStorage.getItem('token');

    const fetchProfileData = async () => {
        try {
            const profile = await UserService.getYourProfile(token);
            setProfileData(profile.user);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return (
        <div className="container mt-5">
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
        </div>
    );
};

export default ProfileComponent;
