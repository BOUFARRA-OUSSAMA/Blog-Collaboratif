import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

class UserService {
    static async login(formData) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, formData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async register(userData, token) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async listUsers(token) {
        try {
            const response = await axios.get(`${BASE_URL}/admin/get-all-users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getYourProfile(token) {
        try {
            const response = await axios.get(`${BASE_URL}/adminuser/get-profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getUser(userId, token) {
        try {
            const response = await axios.get(`${BASE_URL}/admin/get-user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(userId, userData, token) {
        try {
            const response = await axios.put(`${BASE_URL}/admin/update-user/${userId}`, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(userId, token) {
        try {
            const response = await axios.delete(`${BASE_URL}/admin/delete-user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
        

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
    }

    static isAuthenticated() {
        // Check if the user is authenticated (e.g., by checking if a token exists in local storage)
        // Example:
        return localStorage.getItem('token') !== null;
    }


    static isAdmin() {
        // Check if the authenticated user is an admin
        // You can get user role from local storage or decode the token to get user role
        // Example:
        const userRole = localStorage.getItem('role');
        return userRole === 'ADMIN';
    }

    static isCustomer() {
        // Check if the authenticated user is a customer
        // Similar to isAdmin(), you can get user role from local storage or decode the token
        // Example:
        const userRole = localStorage.getItem('role');
        return userRole === 'CUSTOMER';
    }

    static adminOnly() {
        // Check if the authenticated user is an admin, else throw an error
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default UserService;
