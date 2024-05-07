package net.javaguides.springboot.dto;

import java.time.LocalDate;
import java.util.List;

import net.javaguides.springboot.enums.UserRole;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.model.Order;

public class UserDto {
    
    private long id;
    private String username;
    private String fname;
    private String lname;
    private String email;
    private String address;
    private String tel;
    private LocalDate creationDate;
    private String password;
    private UserRole role;
    
    // Change Cart and Orders attributes to direct model types
    private Cart cart;
    private List<Order> orders;
    
    public UserDto(long id, String username, String fname, String lname, String email, String address, String tel, LocalDate creationDate, String password, UserRole role, Cart cart, List<Order> orders) {
        super();
        this.id = id;
        this.username = username;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.address = address;
        this.tel = tel;
        this.creationDate = creationDate;
        this.password = password;
        this.role = role;
        this.cart = cart;
        this.orders = orders;
    }
    
    // Getters and setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
