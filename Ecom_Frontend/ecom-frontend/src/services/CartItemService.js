import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const CartItemService = {
  getCartItemsByCartId: async (cartId, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/cart-items/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  createCartItem: async (cartItemDto, token) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/cart-items/create`, cartItemDto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateCartItem: async (cartItemId, cartItemDto, token) => {
    try {
      const response = await axios.put(`${BASE_URL}/user/cart-items/update/${cartItemId}`, cartItemDto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteCartItem: async (cartItemId, token) => {
    try {
      await axios.delete(`${BASE_URL}/user/cart-items/delete/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default CartItemService;
