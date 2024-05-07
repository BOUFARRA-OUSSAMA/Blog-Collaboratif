import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const OrderService = {
    getOrdersByUserId: async (userId, token) => {
        try {
            const response = await axios.get(`${BASE_URL}/user/orders/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    createOrder: async (orderDto, token) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/create-order`, orderDto, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    cancelOrder: async (orderId, token) => {
        try {
            await axios.delete(`${BASE_URL}/admin/cancel/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            throw error.response.data;
        }
    },

    getAllOrders: async (token) => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    userCancelOrder: async (userId, orderId, token) => {
        try {
            const response = await axios.delete(`${BASE_URL}/user/${userId}/cancel/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            if (error.response.status === 400) {
                throw new Error(error.response.data);
            } else {
                throw error.response.data;
            }
        }
    },

    addCartItemsToOrder: async (orderId, token, cartItems) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/order/${orderId}/items`, cartItems, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
    
};

export default OrderService;
