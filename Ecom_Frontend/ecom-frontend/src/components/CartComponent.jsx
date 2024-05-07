import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import CartService from '../services/CartService';
import OrderService from '../services/OrderService';
import UserService from '../services/userService';
import CartItemService from '../services/CartItemService';

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token] = useState(localStorage.getItem('token'));
    const today = new Date();
    const creationDate = today.toISOString().slice(0, 19);

    useEffect(() => {
        // Fetch cart items when the component mounts
        fetchCartItems();
        fetchProfileData();
        fetchOrders();
    }, []);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            setError(null);

            const userdata = await UserService.getYourProfile(token); // Implement getCurrentUserCartId function
            const cartId = userdata.user.cart.id;
            
            // Fetch cart items using CartService
            const cartItemsResponse = await CartService.getCartDetails(cartId, token);
            console.log("cart details:");
            console.log(cartItemsResponse);

            // Update cart items state
            setCartItems(cartItemsResponse.cartItems);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchProfileData = async () => {
        try {
            const profile = await UserService.getYourProfile(token);
            setProfileData(profile.user);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const userdata = await UserService.getYourProfile(token);
            console.log(userdata.user.id);

            const orders = await OrderService.getOrdersByUserId(userdata.user.id, token);
            setOrders(orders);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleOrderCart = async () => {
        try {
            setLoading(true);
            setError(null);

            const totalPricee = cartItems.reduce((total, cartItem) => total + cartItem.price, 0);

            const newOrder = {
                user: profileData,
                orderDate: creationDate, 
                status: "pending",
                totalPrice: totalPricee,
            };

            console.log(newOrder);

            // Create an order using OrderService
            const ord = await OrderService.createOrder(newOrder, token);

            console.log(token);

            console.log(cartItems);

            await OrderService.addCartItemsToOrder(ord.id, token, cartItems);

            // Clear the cart using CartService

            // Fetch cart items again to update the cart view
            await fetchCartItems();

            alert('Order placed successfully!');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await CartItemService.deleteCartItem(cartItemId, token);
            // Fetch cart items again to update the cart view
            await fetchCartItems();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChangeQuantity = (cartItemId, newQuantity) => {
        setCartItems(prevCartItems =>
            prevCartItems.map(item =>
                item.id === cartItemId ? { ...item, newQuantity } : item
            )
        );
    };

    const handleUpdateQuantity = async (cartItemId) => {
        try {
            const cartItem = cartItems.find(item => item.id === cartItemId);
            if (!cartItem) return;

            const cartItemDto = {
                ...cartItem,
                quantity: cartItem.newQuantity
            };
            console.log(cartItemDto);
            await CartItemService.updateCartItem(cartItemId, cartItemDto, token);
            // Fetch cart items again to update the cart view
            await fetchCartItems();
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cartItems.map((cartItem) => (
                    <li key={cartItem.id}>
                        <Link to={`/public/products/${cartItem.product.id}`}>{cartItem.product.name}</Link> - Quantity: {cartItem.quantity} - Price: {cartItem.price}
                        <button onClick={() => handleRemoveItem(cartItem.id)}>Remove</button>
                        <input
                            type="number"
                            value={cartItem.newQuantity !== undefined ? cartItem.newQuantity : cartItem.quantity}
                            onChange={(e) => handleChangeQuantity(cartItem.id, e.target.value)}
                        />
                        <button onClick={() => handleUpdateQuantity(cartItem.id)}>Update Quantity</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleOrderCart}>Order Cart</button>
        </div>
    );
};

export default CartComponent;
