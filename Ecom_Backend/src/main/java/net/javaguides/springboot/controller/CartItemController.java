package net.javaguides.springboot.controller;

import net.javaguides.springboot.dto.CartItemDto;
import net.javaguides.springboot.exception.CartItemNotFoundException;
import net.javaguides.springboot.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/cart-items")
public class CartItemController {

    private final CartItemService cartItemService;

    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<List<CartItemDto>> getCartItemsByCartId(@PathVariable Long cartId) {
        List<CartItemDto> cartItems = cartItemService.getCartItemsByCartId(cartId);
        return ResponseEntity.ok(cartItems);
    }

    @PostMapping("/create")
    public ResponseEntity<CartItemDto> createCartItem(@RequestBody CartItemDto cartItemDto) {
        CartItemDto createdCartItem = cartItemService.createCartItem(cartItemDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCartItem);
    }

    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<CartItemDto> updateCartItem(@PathVariable Long cartItemId, @RequestBody CartItemDto cartItemDto) {
        try {
            CartItemDto updatedCartItem = cartItemService.updateCartItem(cartItemId, cartItemDto);
            return ResponseEntity.ok(updatedCartItem);
        } catch (CartItemNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{cartItemId}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartItemId) {
        try {
            cartItemService.deleteCartItem(cartItemId);
            return ResponseEntity.noContent().build();
        } catch (CartItemNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
