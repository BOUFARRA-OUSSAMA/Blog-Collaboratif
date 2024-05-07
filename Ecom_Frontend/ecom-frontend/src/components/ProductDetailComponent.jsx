import React, { useEffect, useState } from 'react';
import { getProduct } from '../services/ProductService';
import { useParams } from 'react-router-dom';
import CartItemService from '../services/CartItemService';
import CartService from '../services/CartService';
import UserService from '../services/userService';

const ProductDetailComponent = () => {

    const token = localStorage.getItem('token');

    const productId = useParams().id; // Fetch the product ID from URL params

    const [product, setProduct] = useState(null); // State to store the product data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        setLoading(true); // Set loading state to true while fetching data
        setError(null); // Clear any previous error

        // Fetch product data using getProduct function from ProductService
        getProduct(productId)
            .then(response => {
                // Update product state with fetched data
                setProduct(response.data);
            })
            .catch(error => {
                // Set error state if there's an error during fetching
                setError(error.message);
            })
            .finally(() => {
                setLoading(false); // Set loading state to false when fetching is done
            });

        // Fetch user's role
        UserService.getYourProfile(token)
            .then(userData => {
                setUserRole(userData.user.role);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [productId, token]); // Fetch product data whenever productId changes

    const handleAddToCart = async () => {
        try {
            // Prompt the user for the quantity using window.prompt
            const quantityInput = window.prompt('Enter the quantity:', '1');
            
            // Convert the input to a number
            const quantity = parseInt(quantityInput, 10);

            // Assuming you have a way to get the current user's cartId
            const userdata = await UserService.getYourProfile(token); // Implement getCurrentUserCartId function
            const cartId = userdata.user.cart.id;
            console.log(cartId);

            const cartDetails = await CartService.getCartDetails(cartId, token);
            
            // Check if the quantity is valid
            if (!isNaN(quantity) && quantity > 0) {
                // Create a new cart item
                const newCartItem = {
                    cart: cartDetails,
                    product: product,
                    quantity: quantity, // Use the quantity entered by the user
                    price: product.basePrice // Assuming product.price is available
                };
    
                // Call the createCartItem function to create a new cart item
                const createdCartItem = await CartItemService.createCartItem(newCartItem, token);
    
                // Add the newly created cart item to the user's cart
                await CartService.addItemToCart(cartId, createdCartItem, token);
    
                // Optionally, you can display a success message or perform other actions after adding to cart
                alert('Item added to cart successfully!');
            } else {
                // Show an error message if the quantity is invalid
                alert('Invalid quantity. Please enter a valid number greater than 0.');
            }
        } catch (error) {
            // Handle errors, such as displaying an error message
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };
    

    if (loading) {
        return <div>Loading...</div>; // Display loading message while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if there's an error
    }

    if (!product) {
        return <div>No product found!</div>; // Display message if no product data is found
    }

    // Render product details
    return (
        <div>
            <h2>{product.name}</h2>
            <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: '200px', maxHeight: '200px' }} // Set maximum width and height
            />
            <p>Base Price: {product.basePrice}</p>
            <p>Reduction: {product.reduction}</p>
            <p>Threshold: {product.threshold}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            {/* Add to cart button */}
            {userRole === 'CUSTOMER' && (
                <button onClick={handleAddToCart}>Add to Cart</button>
            )}
        </div>
    );
};

export default ProductDetailComponent;
