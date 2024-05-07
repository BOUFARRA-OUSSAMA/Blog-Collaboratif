import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const CartService = {
  getCartDetails: async (cartId, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  addItemToCart: async (cartId, cartItemDto, token) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/cart/${cartId}/items`, cartItemDto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  removeItemFromCart: async (cartId, itemId, token) => {
    try {
      await axios.delete(`${BASE_URL}/user/cart/${cartId}/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error.response.data;
    }
  },

  clearCart: async (cartId, token) => {
    try {
      await axios.post(`${BASE_URL}/user/cart/${cartId}/clear`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default CartService;
