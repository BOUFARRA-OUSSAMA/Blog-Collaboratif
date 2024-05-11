import React, { useEffect, useState } from 'react';
import OrderService from '../services/OrderService';
import UserService from '../services/userService';
import { Link } from 'react-router-dom';
import '../App.css';

const UserOrdersComponent = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token] = useState(localStorage.getItem('token'));
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const userData = await UserService.getYourProfile(token);
            const userId = userData.user.id;

            const fetchedOrders = await OrderService.getOrdersByUserId(userId, token);
            setOrders(fetchedOrders);
            setFilteredOrders(fetchedOrders);
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

    const handleCancelOrder = async (orderId, userId) => {
        const confirmed = window.confirm('Are you sure you want to cancel this order?');
        if (!confirmed) {
            return; // Do not proceed with form submission if not confirmed
        }
        try {
            setLoading(true);
            setError(null);

            await OrderService.userCancelOrder(userId, orderId, token);
            // After cancelling the order, refresh the order list
            await fetchOrders();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = orders.filter(order => order.cartItems.some(item => item.product.name.toLowerCase().includes(query)));
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
                <h2 className="order-heading">Your Orders</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by product..."
                />
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
                                    <span className="order-item">Date: {order.orderDate}</span>
                                    <span className="order-item">Total Price: {order.totalPrice}</span>
                                </div>
                                <span className="status-item">Status: {order.status}</span>
                                {order.status !== "Cancelled" && (
                                    <button className="cancel-btn" onClick={() => handleCancelOrder(order.id, order.user.id)}>Cancel</button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            <div className="bottom-padding"></div>
        </div>
    );
};

export default UserOrdersComponent;
