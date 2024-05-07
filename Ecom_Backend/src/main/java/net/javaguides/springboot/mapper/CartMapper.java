package net.javaguides.springboot.mapper;

import net.javaguides.springboot.dto.CartDto;
import net.javaguides.springboot.model.Cart;

import java.util.stream.Collectors;

public class CartMapper {
    
    public static CartDto mapToCartDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cart.getId());
        cartDto.setUser(UserMapper.mapToUserDto(cart.getUser()));
        cartDto.setCartItems(cart.getCartItems().stream()
                .map(CartItemMapper::mapToCartItemDto)
                .collect(Collectors.toList()));
        return cartDto;
    }
    
    public static Cart mapToCart(CartDto cartDto) {
        Cart cart = new Cart();
        cart.setId(cartDto.getId());
        cart.setUser(UserMapper.mapToUser(cartDto.getUser()));
        cart.setCartItems(cartDto.getCartItems().stream()
                .map(CartItemMapper::mapToCartItem)
                .collect(Collectors.toList()));
        return cart;
    }
}
