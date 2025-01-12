package net.javaguides.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.dto.CartDto;
import net.javaguides.springboot.exception.CartNotFoundException;
import net.javaguides.springboot.mapper.CartMapper;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.model.CartItem;
import net.javaguides.springboot.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Method to find a cart by user ID
    public Optional<Cart> findCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }
    
    public CartDto getCartDetails(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found for user with ID: " + userId));
        return CartMapper.mapToCartDto(cart);
    }

    

    /// Method to add a cart item to the cart
    public CartDto addItemToCart(Long cartId, CartItem cartItem) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            
            // Set the cart for the cart item
            cartItem.setCart(cart);
            
            List<CartItem> cartItems = cart.getCartItems();
            cartItems.add(cartItem);
            cart.setCartItems(cartItems);
            cart = cartRepository.save(cart); // Save the updated cart

            // Convert the updated cart to a CartDto
            CartDto cartDto = CartMapper.mapToCartDto(cart);
            return cartDto;
        }
        throw new CartNotFoundException("Cart not found with ID: " + cartId);
    }



 // Method to remove a cart item from the cart
    public Cart removeItemFromCart(Long cartId, Long cartItemId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            List<CartItem> cartItems = cart.getCartItems();
            cartItems.removeIf(item -> Long.valueOf(item.getId()).equals(cartItemId));
            cart.setCartItems(cartItems);
            return cartRepository.save(cart);
        }
        return null; // Handle cart not found
    }


    // Method to clear the cart
    public void clearCart(Long cartId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        optionalCart.ifPresent(cart -> {
            cart.setCartItems(null);
            cartRepository.save(cart);
        });
    }
}
