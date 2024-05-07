package net.javaguides.springboot.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {
    
    private Long id;
    private UserDto user;
    private List<CartItemDto> cartItems; // Assuming CartItemDto is the DTO for CartItem
    private LocalDateTime orderDate;
    private String status;
    private BigDecimal totalPrice; // Added totalPrice attribute

    public OrderDto() {
        this.orderDate = LocalDateTime.now(); // Automatically set the order date to the current date and time
    }

    public OrderDto(Long id, UserDto user, List<CartItemDto> cartItems, LocalDateTime orderDate, String status, BigDecimal totalPrice) {
        this.id = id;
        this.user = user;
        this.cartItems = cartItems;
        this.orderDate = orderDate;
        this.status = status;
        this.totalPrice = totalPrice;
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

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}
