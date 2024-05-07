import React, { useState, useEffect } from 'react';
import UserService from '../services/userService'; // Import the renamed service
import { useNavigate } from 'react-router-dom';

const ListuserComponent = () => {
    const [users, setUsers] = useState([]);
    const navigator = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await UserService.listUsers(token);
            setUsers(response); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching users: ', error);
        }
    };

    const addNewuser = () => {
        navigator('/add-user');
    };

    const updateUser = (userId) => {
        // Navigate to the update user form with the user ID as a URL parameter
        navigator(`/admin/update-user/${userId}`);
    };

    const removeUser = async (id) => {
        try {
            await UserService.deleteUser(id, token);
            getAllUsers(); // Fetch users again after deletion
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    return (
        <div>
            <h2>List of users</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Telephone</th>
                        <th>Creation Date</th>
                        <th>Role</th>
                        <th>Actions</th> {/* New column for update and delete buttons */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.tel}</td>
                            <td>{user.creationDate}</td>
                            <td>{user.role}</td>
                            <td>
                                {/* Update button for each user */}
                                <button className="btn btn-primary mr-2" onClick={() => updateUser(user.id)}>Update</button>
                                {/* Delete button for each user */}
                                <button className="btn btn-danger" onClick={() => removeUser(user.id)}
                                    style={{ marginLeft: '10px' }}
                                >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <button className="btn btn-primary" onClick={addNewuser}>Add User</button>
            </div>
        </div>
    );
};

export default ListuserComponent;
