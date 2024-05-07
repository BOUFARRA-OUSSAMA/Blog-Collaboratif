import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080';

// Function to fetch all products
export const listProducts = () => axios.get(REST_API_BASE_URL + '/public/products');

// Function to create a new product (requires admin privileges)
export const createProduct = (product, token) => axios.post(REST_API_BASE_URL + '/admin/create-product', product, {
    headers: { Authorization: `Bearer ${token}` }
});

// Function to fetch a product by ID
export const getProduct = (productId) => axios.get(REST_API_BASE_URL + '/public/products/' + productId);

// Function to update a product (requires admin privileges)
export const updateProduct = (productId, product, token) => axios.put(REST_API_BASE_URL + '/admin/update-product/' + productId, product, {
    headers: { Authorization: `Bearer ${token}` }
});

// Function to delete a product (requires admin privileges)
export const deleteProduct = (productId, token) => axios.delete(REST_API_BASE_URL + '/admin/delete-product/' + productId, {
    headers: { Authorization: `Bearer ${token}` }
});

// Define the endpoint for fetching categories
const CATEGORIES_ENDPOINT = '/categories';

// Function to fetch categories from the backend
export const getCategories = async () => {
    try {
        // Send a GET request to fetch categories
        const response = await axios.get(REST_API_BASE_URL + CATEGORIES_ENDPOINT);
        return response.data; // Assuming categories are returned as an array of strings
    } catch (error) {
        throw new Error('Error fetching categories');
    }
};
