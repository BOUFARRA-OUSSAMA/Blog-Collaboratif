// AuthService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {username, password})
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const register = async (userData, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData,
        {
            headers: {Authorization: `Bearer${token}`}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
};
