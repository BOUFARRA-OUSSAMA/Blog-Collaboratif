import React, { useState, useEffect } from 'react';
import UserService from '../services/userService'; // Import the renamed service
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ListuserComponent = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust this number as needed
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
        navigator('/register');
    };

    const updateUser = (userId) => {
        // Navigate to the update user form with the user ID as a URL parameter
        navigator(`/admin/update-user/${userId}`);
    };

    const removeUser = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                await UserService.deleteUser(id, token);
                getAllUsers(); // Fetch users again after deletion
            } catch (error) {
                console.error('Error deleting user: ', error);
            }
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.filter(user => {
        return (
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }).slice(indexOfFirstItem, indexOfLastItem);

    const handlePaginationClick = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="custom-margin">
            <h2>List of users</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by username or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
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
                    {currentUsers.map(user => (
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
            <div className="pagination">
                {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map((_, index) => (
                    <button key={index} className="btn btn-light" onClick={() => handlePaginationClick(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
            <div className="bottom-padding"></div>
        </div>
    );
};

export default ListuserComponent;
