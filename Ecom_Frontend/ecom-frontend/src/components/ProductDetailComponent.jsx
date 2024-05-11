import React, { useEffect, useState } from 'react';
import { getProduct } from '../services/ProductService';
import { useParams } from 'react-router-dom';
import CartItemService from '../services/CartItemService';
import CartService from '../services/CartService';
import UserService from '../services/userService';
import '../App.css';

const ProductDetailComponent = () => {
    const token = localStorage.getItem('token');
    const productId = useParams().id;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getProduct(productId)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

        UserService.getYourProfile(token)
            .then(userData => {
                setUserRole(userData.user.role);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [productId, token]);

    const handleAddToCart = async () => {
        try {
            const quantityInput = window.prompt('Enter the quantity:', '1');
            const quantity = parseInt(quantityInput, 10);

            const userdata = await UserService.getYourProfile(token);
            const cartId = userdata.user.cart.id;

            const cartDetails = await CartService.getCartDetails(cartId, token);

            if (!isNaN(quantity) && quantity > 0) {
                const newCartItem = {
                    cart: cartDetails,
                    product: product,
                    quantity: quantity,
                    price: product.basePrice
                };

                const createdCartItem = await CartItemService.createCartItem(newCartItem, token);

                await CartService.addItemToCart(cartId, createdCartItem, token);

                alert('Item added to cart successfully!');
            } else {
                alert('Invalid quantity. Please enter a valid number greater than 0.');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No product found!</div>;
    }

    return (
        <div className="custom-margin">
            <div className="product-details">
                <div className="product-image">
                    <img src={product.image} alt={product.name} style={{ maxWidth: '400px', maxHeight: '400px' }} />
                </div>
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price">Price: ${product.basePrice}</p>
                    <p className="product-reduction">Reduction: {product.reduction * 100}%</p>
                    <p className="product-threshold">Threshold: {product.threshold}</p>
                    <p className="product-quantity">Quantity: {product.quantity}</p>
                    <p className="product-description">Description: {product.description}</p>
                    <p className="product-category">Category: {product.category}</p>
                    {userRole === 'CUSTOMER' && (
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailComponent;
