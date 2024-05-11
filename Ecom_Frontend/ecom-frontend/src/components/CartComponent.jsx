import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartService from '../services/CartService';
import OrderService from '../services/OrderService';
import UserService from '../services/userService';
import CartItemService from '../services/CartItemService';
import '../App.css';

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token] = useState(localStorage.getItem('token'));
    const today = new Date();
    const creationDate = today.toISOString().slice(0, 19);

    useEffect(() => {
        fetchCartItems();
        fetchProfileData();
    }, []);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            setError(null);

            const userdata = await UserService.getYourProfile(token);
            const cartId = userdata.user.cart.id;

            const cartItemsResponse = await CartService.getCartDetails(cartId, token);
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

    const handleOrderCart = async () => {
        const confirmed = window.confirm('Are you sure you want to finalize the order?');
        if (!confirmed) {
            return;
        }
        try {
            setLoading(true);
            setError(null);

            const totalPrice = cartItems.reduce((total, cartItem) => total + cartItem.price, 0);

            const newOrder = {
                user: profileData,
                orderDate: creationDate,
                status: 'pending',
                totalPrice: totalPrice,
            };

            const ord = await OrderService.createOrder(newOrder, token);

            await OrderService.addCartItemsToOrder(ord.id, token, cartItems);

            await fetchCartItems();

            alert('Order placed successfully!');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        const confirmed = window.confirm('Are you sure you want to remove this item from your cart?');
        if (!confirmed) {
            return;
        }
        try {
            await CartItemService.deleteCartItem(cartItemId, token);
            await fetchCartItems();
        } catch (error) {
            setError(error.message);
        }
    };
    

    const handleChangeQuantity = (cartItemId, newQuantity) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === cartItemId ? { ...item, newQuantity } : item
            )
        );
    };

    const handleUpdateQuantity = async (cartItemId) => {
        try {
            const cartItem = cartItems.find((item) => item.id === cartItemId);
            if (!cartItem) return;

            const cartItemDto = {
                ...cartItem,
                quantity: cartItem.newQuantity,
            };
            await CartItemService.updateCartItem(cartItemId, cartItemDto, token);
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
        <div className="custom-margin">
                <h2 className="cart-title mb-4 text-center">Your Shopping Cart</h2>
                <div className="row">
                    {cartItems.map((cartItem) => (
                        <div className="col-md-4" key={cartItem.id}>
                            <div className="card mb-3">
                                <img src={cartItem.product.image} className="card-img-top" alt={cartItem.product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/public/products/${cartItem.product.id}`}>
                                            {cartItem.product.name}
                                        </Link>
                                    </h5>
                                    <p className="card-text">Quantity: {cartItem.quantity}</p>
                                    <p className="card-text">Price: {cartItem.price}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <div className="form-group mb-0">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={
                                                cartItem.newQuantity !== undefined
                                                    ? cartItem.newQuantity
                                                    : cartItem.quantity
                                            }
                                            onChange={(e) =>
                                                handleChangeQuantity(cartItem.id, e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleUpdateQuantity(cartItem.id)}
                                        >
                                            Update Quantity
                                        </button>
                                        <button
                                            className="btn btn-danger ml-2"
                                            onClick={() => handleRemoveItem(cartItem.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" onClick={handleOrderCart}>
                    Order Cart
                </button>
            <div className="bottom-padding"></div>
        </div>
    );
};

export default CartComponent;
