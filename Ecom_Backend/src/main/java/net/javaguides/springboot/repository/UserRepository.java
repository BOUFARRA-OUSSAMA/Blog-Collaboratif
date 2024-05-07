package net.javaguides.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.user;

@Repository
public interface UserRepository extends JpaRepository<user, Long>{
	
	Optional<user> findByUsername(String username);
	
	boolean existsByUsername(String username); // Method to check if username exists

    boolean existsByEmail(String email); // Method to check if email exists
}
