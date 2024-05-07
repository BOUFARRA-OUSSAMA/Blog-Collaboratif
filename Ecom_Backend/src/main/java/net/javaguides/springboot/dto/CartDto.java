package net.javaguides.springboot.dto;

import java.util.List;

public class CartDto {
    
    private Long id;
    private UserDto user; // User to whom the cart belongs
    private List<CartItemDto> cartItems; // List of items in the cart

    public CartDto() {
    }

    public CartDto(Long id, UserDto user, List<CartItemDto> cartItems) {
        this.id = id;
        this.user = user;
        this.cartItems = cartItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<CartItemDto> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemDto> cartItems) {
        this.cartItems = cartItems;
    }
}
