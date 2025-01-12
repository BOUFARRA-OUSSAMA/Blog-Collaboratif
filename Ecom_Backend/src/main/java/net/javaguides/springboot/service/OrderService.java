package net.javaguides.springboot.service;

import net.javaguides.springboot.dto.OrderDto;
import net.javaguides.springboot.exception.OrderNotFoundException;
import net.javaguides.springboot.exception.QuantityExceededException;
import net.javaguides.springboot.mapper.OrderMapper;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.model.CartItem;
import net.javaguides.springboot.model.Order;
import net.javaguides.springboot.model.Product;
import net.javaguides.springboot.model.user;
import net.javaguides.springboot.repository.OrderRepository;
import net.javaguides.springboot.repository.ProductRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductRepository productRepository;

    // Create an order
    @Transactional
    public OrderDto createOrder(OrderDto orderDto) {
        // Map OrderDto to Order entity
        Order order = OrderMapper.mapToOrder(orderDto);

        // Retrieve user from OrderDto
        user user = order.getUser();

        // Initialize logger
        Logger logger = LoggerFactory.getLogger(OrderService.class);

        // Log the contents of the cart
        if (user != null) {
            Cart cart = user.getCart();
            if (cart != null) {
                logger.info("Cart contents: {}", cart.getCartItems());
            } else {
                logger.warn("User's cart is null");
            }
        } else {
            logger.warn("User is null");
        }

        // Save the order entity
        order = orderRepository.save(order);

        // Map Order entity back to OrderDto and return
        return OrderMapper.mapToOrderDto(order);
    }
    
    public OrderDto addCartItemsToOrder(Long orderId, List<CartItem> cartItems) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            user user = order.getUser();
            if (user != null) {
                // Clear existing cart items from the order
                order.getCartItems().clear();

                // Set the order for each cart item and decrease available product quantity
                for (CartItem item : cartItems) {
                    item.setOrder(order);
                    Product product = item.getProduct();
                    int quantityToDecrease = item.getQuantity();
                    decreaseProductQuantity(product, quantityToDecrease);
                }

                // Add provided cart items to the order
                order.getCartItems().addAll(cartItems);
            }

            // Save the updated order entity
            order = orderRepository.save(order);

            // Map Order entity back to OrderDto and return
            return OrderMapper.mapToOrderDto(order);
        }
        throw new OrderNotFoundException("Order not found with ID: " + orderId);
    }

    private void decreaseProductQuantity(Product product, int quantityToDecrease) {
        int currentQuantity = product.getQuantity();
        if (currentQuantity < quantityToDecrease) {
            throw new QuantityExceededException("Quantity exceeds available quantity for product with ID: " + product.getId());
        }
        product.setQuantity(currentQuantity - quantityToDecrease);
        productRepository.save(product);
    }





    // Get all orders by user ID
    public List<OrderDto> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(OrderMapper::mapToOrderDto)
                .collect(Collectors.toList());
    }

    // Get all orders (for admin)
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(OrderMapper::mapToOrderDto)
                .collect(Collectors.toList());
    }

    // Cancel an order
    public OrderDto cancelOrder(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (!order.getStatus().equals("Delivered") && !order.getStatus().equals("Cancelled")) {
                order.setStatus("Cancelled");
                increaseProductQuantity(order.getCartItems());
                order = orderRepository.save(order);
                return OrderMapper.mapToOrderDto(order);
            } else {
                throw new IllegalArgumentException("Order cannot be cancelled because its status is " + order.getStatus());
            }
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    public OrderDto userCancelOrder(Long userId, Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getUser().getId() == userId) {
                if (!order.getStatus().equals("Delivered") && !order.getStatus().equals("Cancelled")) {
                    order.setStatus("Cancelled");
                    increaseProductQuantity(order.getCartItems());
                    order = orderRepository.save(order);
                    return OrderMapper.mapToOrderDto(order);
                } else {
                    throw new IllegalArgumentException("Order cannot be cancelled because its status is " + order.getStatus());
                }
            } else {
                throw new IllegalArgumentException("User does not have permission to cancel this order");
            }
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    private void increaseProductQuantity(List<CartItem> cartItems) {
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            int quantityToIncrease = cartItem.getQuantity();
            product.setQuantity(product.getQuantity() + quantityToIncrease);
            productRepository.save(product);
        }
    }

}
