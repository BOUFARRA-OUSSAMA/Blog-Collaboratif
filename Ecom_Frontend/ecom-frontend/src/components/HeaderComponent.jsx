import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/userService';
import '../App.css'

const HeaderComponent = () => {
    const handleLogout = () => {
        UserService.logout();
        window.location.href = '/';
    };

    return (
        <nav className="header navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Ecom</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {!UserService.isAuthenticated() && (
                            <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}

                        {!UserService.isAuthenticated() && (
                            <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        )}
                        
                        {UserService.isAuthenticated() && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                        )}
                        {UserService.isAdmin() && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/get-all-users">User Management</Link>
                            </li>
                        )}
                        {UserService.isAdmin() && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/products">Product Management</Link>
                            </li>
                        )}
                        {UserService.isAdmin() && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/orders">Orders</Link>
                            </li>
                        )}
                        {UserService.isCustomer() && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/cart">Cart</Link>
                            </li>
                        )}
                        {UserService.isCustomer() && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/orders">My Orders</Link>
                            </li>
                        )}
                        
                    </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {UserService.isAuthenticated() && (
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HeaderComponent;
