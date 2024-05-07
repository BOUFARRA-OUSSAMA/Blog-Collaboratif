package net.javaguides.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.model.CartItem;
import net.javaguides.springboot.model.Product;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCartId(Long cartId);
    Optional<CartItem> findByIdAndCartId(Long id, Long cartId);
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}
