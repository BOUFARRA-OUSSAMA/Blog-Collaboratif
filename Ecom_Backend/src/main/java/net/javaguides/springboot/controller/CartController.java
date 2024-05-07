package net.javaguides.springboot.controller;

import net.javaguides.springboot.dto.CartDto;
import net.javaguides.springboot.dto.CartItemDto;
import net.javaguides.springboot.mapper.CartItemMapper;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.model.CartItem;
import net.javaguides.springboot.model.user;
import net.javaguides.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get cart details by cart id
    @GetMapping("/cart/{cartId}")
    public ResponseEntity<CartDto> getCartDetails(@PathVariable Long cartId) {
        CartDto cartDto = cartService.getCartDetails(cartId);
        if (cartDto != null) {
            return ResponseEntity.ok(cartDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Add item to cart
    @PostMapping("/cart/{cartId}/items")
    public ResponseEntity<CartDto> addItemToCart(@PathVariable Long cartId, @RequestBody CartItemDto cartItemDto) {
        // Convert CartItemDto to CartItem
        CartItem cartItem = CartItemMapper.mapToCartItem(cartItemDto);
        
        // Call the service method with the converted CartItem
        CartDto updatedCart = cartService.addItemToCart(cartId, cartItem);
        
        // Return the updated cart
        return ResponseEntity.ok(updatedCart);
    }


    // Remove item from cart
    @DeleteMapping("/cart/{cartId}/items/{itemId}")
    public ResponseEntity<Void> removeItemFromCart(@PathVariable Long cartId, @PathVariable Long itemId) {
        cartService.removeItemFromCart(cartId, itemId);
        return ResponseEntity.noContent().build();
    }

    // Clear cart when making an order
    @PostMapping("/cart/{cartId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }
}
