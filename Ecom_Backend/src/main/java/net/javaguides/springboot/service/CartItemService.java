package net.javaguides.springboot.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import net.javaguides.springboot.dto.CartItemDto;
import net.javaguides.springboot.exception.CartItemNotFoundException;
import net.javaguides.springboot.exception.CartNotFoundException;
import net.javaguides.springboot.exception.InvalidPriceException;
import net.javaguides.springboot.exception.QuantityExceededException;
import net.javaguides.springboot.mapper.CartItemMapper;
import net.javaguides.springboot.mapper.CartMapper;
import net.javaguides.springboot.mapper.ProductMapper;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.model.CartItem;
import net.javaguides.springboot.repository.CartItemRepository;
import net.javaguides.springboot.repository.CartRepository;

@Service
@Transactional
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;
    private CartRepository cartRepository;

    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public List<CartItemDto> getCartItemsByCartId(Long cartId) {
        List<CartItem> cartItems = cartItemRepository.findByCartId(cartId);
        return CartItemMapper.mapToCartItemDtoList(cartItems);
    }

    public CartItemDto createCartItem(CartItemDto cartItemDto) {
        // Check if there is already a cart item with the same cart and product
        Optional<CartItem> existingCartItemOptional = cartItemRepository.findByCartAndProduct(
                CartMapper.mapToCart(cartItemDto.getCart()),
                ProductMapper.mapToProduct(cartItemDto.getProduct())
        );

        if (existingCartItemOptional.isPresent()) {
            // If a cart item with the same cart and product exists, update its quantity and price
            CartItem existingCartItem = existingCartItemOptional.get();
            int newQuantity = existingCartItem.getQuantity() + cartItemDto.getQuantity();
            
            // Check if the new quantity surpasses the available quantity of the product
            if (newQuantity > existingCartItem.getProduct().getQuantity()) {
                throw new QuantityExceededException("Quantity exceeds available quantity for product with ID: " + cartItemDto.getProduct().getId());
            }
            
            BigDecimal basePrice = cartItemDto.getProduct().getBasePrice();
            BigDecimal reduction = BigDecimal.valueOf(cartItemDto.getProduct().getReduction());
            int threshold = cartItemDto.getProduct().getThreshold();

            // Calculate the price without reduction first
            BigDecimal priceWithoutReduction = basePrice.multiply(BigDecimal.valueOf(newQuantity));

            // Apply reduction if quantity is equal to or greater than the threshold
            BigDecimal calculatedPrice;
            if (newQuantity >= threshold) {
                // Limit the reduction to three times the threshold
                int reducedQuantity = Math.min(newQuantity, threshold * 3);
                int wholeNumberReductionMultiplier = reducedQuantity / threshold; // Get only the whole number part
                BigDecimal reductionMultiplier = BigDecimal.valueOf(wholeNumberReductionMultiplier);
                BigDecimal reductionAmount = reduction.multiply(reductionMultiplier).multiply(priceWithoutReduction);
                calculatedPrice = priceWithoutReduction.subtract(reductionAmount);
            } else {
                calculatedPrice = priceWithoutReduction; // No reduction
            }

            // Update existing cart item with new quantity and price
            existingCartItem.setQuantity(newQuantity);
            existingCartItem.setPrice(calculatedPrice.setScale(2, RoundingMode.HALF_UP).doubleValue());

            // Save the updated cart item
            return CartItemMapper.mapToCartItemDto(cartItemRepository.save(existingCartItem));
        } else {
            // If no existing cart item found, create a new one
            BigDecimal basePrice = cartItemDto.getProduct().getBasePrice();
            int quantity = cartItemDto.getQuantity();
            BigDecimal reduction = BigDecimal.valueOf(cartItemDto.getProduct().getReduction());
            int threshold = cartItemDto.getProduct().getThreshold();

            // Calculate the price without reduction first
            BigDecimal priceWithoutReduction = basePrice.multiply(BigDecimal.valueOf(quantity));

            // Apply reduction if quantity is equal to or greater than the threshold
            BigDecimal calculatedPrice;
            if (quantity >= threshold) {
                // Limit the reduction to three times the threshold
                int reducedQuantity = Math.min(quantity, threshold * 3);
                int wholeNumberReductionMultiplier = reducedQuantity / threshold; // Get only the whole number part
                BigDecimal reductionMultiplier = BigDecimal.valueOf(wholeNumberReductionMultiplier);
                BigDecimal newReduction = reduction.multiply(reductionMultiplier);
                BigDecimal reductionAmount = priceWithoutReduction.multiply(newReduction);
                calculatedPrice = priceWithoutReduction.subtract(reductionAmount);
            } else {
                calculatedPrice = priceWithoutReduction; // No reduction
            }

            // Check if the calculated price is less than or equal to zero
            if (calculatedPrice.compareTo(BigDecimal.ZERO) <= 0) {
                throw new InvalidPriceException("Calculated price is invalid for product with ID: " + cartItemDto.getProduct().getId());
            }

            // Update the cart item's price with the calculated price
            cartItemDto.setPrice(calculatedPrice.setScale(2, RoundingMode.HALF_UP).doubleValue());

            // Map the CartItemDto to CartItem and save it to the repository
            CartItem cartItem = CartItemMapper.mapToCartItem(cartItemDto);
            return CartItemMapper.mapToCartItemDto(cartItemRepository.save(cartItem));
        }
    }

    public CartItemDto updateCartItem(Long cartItemId, CartItemDto cartItemDto) {
        // Fetch the existing cart item from the database
        Optional<CartItem> existingCartItemOptional = cartItemRepository.findById(cartItemId);
        
        if (existingCartItemOptional.isPresent()) {
            CartItem existingCartItem = existingCartItemOptional.get();
            
            // Update the quantity and recalculate the price
            int newQuantity = cartItemDto.getQuantity();
            
            // Check if the new quantity surpasses the available quantity of the product
            if (newQuantity > existingCartItem.getProduct().getQuantity()) {
                throw new QuantityExceededException("Quantity exceeds available quantity for product with ID: " + existingCartItem.getProduct().getId());
            }
            
            BigDecimal basePrice = cartItemDto.getProduct().getBasePrice();
            BigDecimal reduction = BigDecimal.valueOf(cartItemDto.getProduct().getReduction());
            int threshold = cartItemDto.getProduct().getThreshold();

            // Calculate the price without reduction first
            BigDecimal priceWithoutReduction = basePrice.multiply(BigDecimal.valueOf(newQuantity));

            // Apply reduction if quantity is equal to or greater than the threshold
            BigDecimal calculatedPrice;
            if (newQuantity >= threshold) {
                // Limit the reduction to three times the threshold
                int reducedQuantity = Math.min(newQuantity, threshold * 3);
                int wholeNumberReductionMultiplier = reducedQuantity / threshold; // Get only the whole number part
                BigDecimal reductionMultiplier = BigDecimal.valueOf(wholeNumberReductionMultiplier);
                BigDecimal reductionAmount = reduction.multiply(reductionMultiplier).multiply(priceWithoutReduction);
                calculatedPrice = priceWithoutReduction.subtract(reductionAmount);
            } else {
                calculatedPrice = priceWithoutReduction; // No reduction
            }

            // Update existing cart item with new quantity and price
            existingCartItem.setQuantity(newQuantity);
            existingCartItem.setPrice(calculatedPrice.setScale(2, RoundingMode.HALF_UP).doubleValue());

            // Save the updated cart item
            return CartItemMapper.mapToCartItemDto(cartItemRepository.save(existingCartItem));
        } else {
            throw new CartItemNotFoundException("Cart item not found with ID: " + cartItemId);
        }
    }




    public void deleteCartItem(Long cartItemId) {
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);
        if (optionalCartItem.isPresent()) {
            cartItemRepository.delete(optionalCartItem.get());
        } else {
            throw new CartItemNotFoundException("Cart item not found with ID: " + cartItemId);
        }
    }



}
