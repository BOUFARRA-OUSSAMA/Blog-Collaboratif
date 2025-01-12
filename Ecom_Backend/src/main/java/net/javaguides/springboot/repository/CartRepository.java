package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import net.javaguides.springboot.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // Custom query method to find cart by user id
    Optional<Cart> findByUserId(Long userId);
    Optional<Cart> findById(Long cartId);
}
