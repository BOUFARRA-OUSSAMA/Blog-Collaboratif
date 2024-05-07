package net.javaguides.springboot.dto;

public class CartItemDto {

    private long id;
    private CartDto cart;
    private OrderDto order;
    private ProductDto product;
    private int quantity;
    private double price;

    public CartItemDto() {
    }

    public CartItemDto(long id, CartDto cart, OrderDto order, ProductDto product, int quantity, double price) {
        this.id = id;
        this.cart = cart;
        this.order = order;
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters and setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public CartDto getCart() {
        return cart;
    }

    public void setCart(CartDto cart) {
        this.cart = cart;
    }

    public OrderDto getOrder() {
        return order;
    }

    public void setOrder(OrderDto order) {
        this.order = order;
    }

    public ProductDto getProduct() {
        return product;
    }

    public void setProduct(ProductDto product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
