import React, { useEffect, useState } from 'react';
import OrderService from '../services/OrderService';
import { Link } from 'react-router-dom';
import '../App.css';

const AdminOrdersComponent = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token] = useState(localStorage.getItem('token'));
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [productNameQuery, setProductNameQuery] = useState('');
    const [orderIdQuery, setOrderIdQuery] = useState('');
    const [userNameQuery, setUserNameQuery] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const allOrders = await OrderService.getAllOrders(token);
            setOrders(allOrders);
            setFilteredOrders(allOrders);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        const confirmed = window.confirm('Are you sure you want to cancel this order?');
        if (!confirmed) {
            return; // Do not proceed with form submission if not confirmed
        }
        try {
            setLoading(true);
            setError(null);
            await OrderService.cancelOrder(orderId, token);
            // After cancelling the order, refresh the order list
            await fetchOrders();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOrderClick = async (order) => {
        setSelectedOrder(order);
        const cartItemsResponse = await OrderService.getOrderCartItems(order.id, token);
        setSelectedOrder((prevOrder) => ({ ...prevOrder, cartItems: cartItemsResponse.cartItems }));
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
    };

    const handleProductNameSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setProductNameQuery(query);
        filterOrders(query, orderIdQuery, userNameQuery);
    };

    const handleOrderIdSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setOrderIdQuery(query);
        filterOrders(productNameQuery, query, userNameQuery);
    };

    const handleUserNameSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setUserNameQuery(query);
        filterOrders(productNameQuery, orderIdQuery, query);
    };

    const filterOrders = (productName, orderId, userName) => {
        const filtered = orders.filter(order =>
            order.cartItems.some(item => item.product.name.toLowerCase().includes(productName)) &&
            order.id.toString().includes(orderId) &&
            order.user.username.toLowerCase().includes(userName)
        );
        setFilteredOrders(filtered);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="custom-margin">
                <h2 className="order-heading">Admin Orders</h2>
                <div className="search-bar-container">
                    <input
                        type="text"
                        value={orderIdQuery}
                        onChange={handleOrderIdSearch}
                        placeholder="Search by order ID..."
                    />
                    <input
                        type="text"
                        value={userNameQuery}
                        onChange={handleUserNameSearch}
                        placeholder="Search by user name..."
                    />
                    <input
                        type="text"
                        value={productNameQuery}
                        onChange={handleProductNameSearch}
                        placeholder="Search by product name..."
                    />
                </div>
                {selectedOrder ? (
                    <div>
                        <h3>Order Details</h3>
                        <button className="close-btn" onClick={handleCloseDetails}>Close</button>
                        <ul className="order-details">
                            {selectedOrder.cartItems.map((item) => (
                                <li key={item.id}>
                                    <Link to={`/public/products/${item.product.id}`}>
                                        <span className="order-item">Product: {item.product.name}</span>
                                    </Link>
                                    <span className="order-item">Quantity: {item.quantity}</span>
                                    <span className="order-item">Price: {item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <ul className="order-list">
                        {filteredOrders.map((order) => (
                            <li key={order.id} onClick={() => handleOrderClick(order)}>
                                <div className="order-info">
                                    <span className="order-item">Order ID: {order.id}</span>
                                    <span className="order-item">Customer: {order.user.username}</span>
                                    <span className="order-item">Date: {order.orderDate}</span>
                                    <span className="order-item">Total Price: {order.totalPrice}</span>
                                </div>
                                <span className="status-item">Status: {order.status}</span>
                                {order.status !== 'Cancelled' && (
                                    <button className="cancel-btn" onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            <div className="bottom-padding"></div>
        </div>
    );
};

export default AdminOrdersComponent;
