package net.javaguides.springboot.mapper;

import net.javaguides.springboot.dto.OrderDto;
import net.javaguides.springboot.model.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDto mapToOrderDto(Order order) {
        Logger logger = LoggerFactory.getLogger(OrderMapper.class);

        logger.info("order3 contents: {}", order.getCartItems() != null ? CartItemMapper.mapToCartItemDtoList(order.getCartItems()) : null);

        return new OrderDto(
                order.getId(), // If id is null, it will be set to null in the OrderDto
                UserMapper.mapToUserDto(order.getUser()),
                order.getCartItems() != null ? CartItemMapper.mapToCartItemDtoList(order.getCartItems()) : null,
                order.getOrderDate(),
                order.getStatus(),
                order.getTotalPrice()
        );
    }

    public static Order mapToOrder(OrderDto orderDto) {
        Logger logger = LoggerFactory.getLogger(OrderMapper.class);

        if (orderDto == null) {
            return null;
        }
        Order order = new Order();
        // Only set the id if it's not null
        if (orderDto.getId() != null) {
            order.setId(orderDto.getId());
        }
        logger.info("order4 contents: {}", orderDto.getCartItems() != null ? CartItemMapper.mapToCartItemList(orderDto.getCartItems()) : null);
        order.setUser(UserMapper.mapToUser(orderDto.getUser()));
        order.setCartItems(orderDto.getCartItems() != null ? CartItemMapper.mapToCartItemList(orderDto.getCartItems()) : null);
        order.setOrderDate(orderDto.getOrderDate());
        order.setStatus(orderDto.getStatus());
        order.setTotalPrice(orderDto.getTotalPrice());
        return order;
    }

    public static List<OrderDto> mapToOrderDtoList(List<Order> orders) {
        return orders.stream()
                .map(OrderMapper::mapToOrderDto)
                .collect(Collectors.toList());
    }

    public static List<Order> mapToOrderList(List<OrderDto> orderDtos) {
        return orderDtos.stream()
                .map(OrderMapper::mapToOrder)
                .collect(Collectors.toList());
    }
}
