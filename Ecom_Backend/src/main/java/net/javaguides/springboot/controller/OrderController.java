package net.javaguides.springboot.controller;

import net.javaguides.springboot.dto.CartItemDto;
import net.javaguides.springboot.dto.OrderDto;
import net.javaguides.springboot.exception.OrderNotFoundException;
import net.javaguides.springboot.model.CartItem;
import net.javaguides.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/user/orders/{userId}")
    public ResponseEntity<List<OrderDto>> getOrdersByUserId(@PathVariable Long userId) {
        List<OrderDto> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/user/create-order")
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }


    @DeleteMapping("/admin/cancel/{orderId}")
    public ResponseEntity<Void> cancelOrder(@PathVariable Long orderId) {
        try {
            orderService.cancelOrder(orderId);
            return ResponseEntity.noContent().build();
        } catch (OrderNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/user/{userId}/cancel/{orderId}")
    public ResponseEntity<Object> userCancelOrder(@PathVariable Long userId, @PathVariable Long orderId) {
        try {
            OrderDto cancelledOrder = orderService.userCancelOrder(userId, orderId);
            return ResponseEntity.ok(cancelledOrder);
        } catch (OrderNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/user/order/{orderId}/items")
    public ResponseEntity<OrderDto> addCartItemsToOrder(@PathVariable Long orderId, @RequestBody List<CartItem> cartItems) {
        try {
            OrderDto updatedOrder = orderService.addCartItemsToOrder(orderId, cartItems);
            return ResponseEntity.ok(updatedOrder);
        } catch (OrderNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
