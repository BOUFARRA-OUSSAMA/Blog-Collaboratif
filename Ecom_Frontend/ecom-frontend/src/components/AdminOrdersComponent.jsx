import React, { useEffect, useState } from 'react';
import OrderService from '../services/OrderService';

const AdminOrdersComponent = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token] = useState(localStorage.getItem('token'));
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const allOrders = await OrderService.getAllOrders(token);
            setOrders(allOrders);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
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

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseDetails = () => {
        setSelectedOrder(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Admin Orders</h2>
            {selectedOrder ? (
                <div>
                    <h3>Order Details</h3>
                    <button onClick={handleCloseDetails}>Close</button>
                    <ul>
                        {selectedOrder.cartItems.map((item) => (
                            <li key={item.id}>
                                Product: {item.product.name}, Quantity: {item.quantity}, Price: {item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} onClick={() => handleOrderClick(order)}>
                            Order ID: {order.id}, User ID: {order.userId}, Status: {order.status}
                            {order.status !== 'Cancelled' && (
                                <button onClick={() => handleCancelOrder(order.id)}>Cancel</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminOrdersComponent;
