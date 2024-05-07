package net.javaguides.springboot.mapper;

import java.util.List;
import java.util.stream.Collectors;

import net.javaguides.springboot.dto.CartItemDto;
import net.javaguides.springboot.model.CartItem;

public class CartItemMapper {
    
    public static CartItemDto mapToCartItemDto(CartItem cartItem) {
        CartItemDto cartItemDto = new CartItemDto();
        cartItemDto.setId(cartItem.getId());
        // Assuming you don't need to map the cart field in the DTO
        // You can add logic here to map other fields if needed
        // Similarly, assuming you don't need to map the order field in the DTO
        cartItemDto.setProduct(ProductMapper.mapToProductDto(cartItem.getProduct()));
        cartItemDto.setQuantity(cartItem.getQuantity());
        cartItemDto.setPrice(cartItem.getPrice());
        return cartItemDto;
    }

    
    public static CartItem mapToCartItem(CartItemDto cartItemDto) {
        CartItem cartItem = new CartItem();
        cartItem.setId(cartItemDto.getId());
        // Assuming you don't need to map the cart field in the entity
        // You can add logic here to map other fields if needed
        // Similarly, assuming you don't need to map the order field in the entity
        cartItem.setProduct(ProductMapper.mapToProduct(cartItemDto.getProduct()));
        cartItem.setQuantity(cartItemDto.getQuantity());
        cartItem.setPrice(cartItemDto.getPrice());
        return cartItem;
    }

    
    public static List<CartItemDto> mapToCartItemDtoList(List<CartItem> cartItems) {
        return cartItems.stream()
                .map(CartItemMapper::mapToCartItemDto)
                .collect(Collectors.toList());
    }

    public static List<CartItem> mapToCartItemList(List<CartItemDto> cartItemDtos) {
        return cartItemDtos.stream()
                .map(CartItemMapper::mapToCartItem)
                .collect(Collectors.toList());
    }
}

