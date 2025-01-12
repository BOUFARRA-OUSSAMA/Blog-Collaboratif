package net.javaguides.springboot.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.dto.ReqRes;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.model.user;
import net.javaguides.springboot.repository.CartRepository;
import net.javaguides.springboot.repository.UserRepository;

@Service
public class UsersManagementService {
	
	@Autowired
	private UserRepository usersRepo;
	
	@Autowired
	private JWTUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@Autowired
	private CartRepository cartRepository;

	// Define the createCart function
	public Cart createCart(user user) {
	    // Create a new Cart object
	    Cart cart = new Cart();
	    
	    // Set the user associated with the cart
	    cart.setUser(user);
	    
	    // Save the cart to the database
	    return cartRepository.save(cart);
	}
	
	
	public ReqRes register(ReqRes registrationRequest) {
	    ReqRes resp = new ReqRes();
	    
	    try {
	        user user = new user();
	        user.setUsername(registrationRequest.getUsername());
	        user.setEmail(registrationRequest.getEmail());
	        user.setAddress(registrationRequest.getAddress());
	        user.setCreationDate(LocalDate.now());
	        user.setFname(registrationRequest.getFname());
	        user.setLname(registrationRequest.getLname());
	        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
	        user.setRole(registrationRequest.getRole());
	        user.setTel(registrationRequest.getTel());
	        
	        if(usersRepo.existsByUsername(user.getUsername())) {
	            resp.setMessage("User");
	        } else if(usersRepo.existsByEmail(user.getEmail())) {
	            resp.setMessage("Email");
	        } else {
	            // Save the user to the database
	            user savedUser = usersRepo.save(user);
	            
	            // Create a new cart for the user
	            Cart cart = new Cart(savedUser);
	            
	            // Save the cart to the database
	            cartRepository.save(cart);
	            
	            savedUser.setCart(cart);
	            usersRepo.save(savedUser);
	            
	            resp.setUser(savedUser);
	            resp.setMessage("User and Cart saved successfully!");
	            resp.setStatusCode(200);
	        }
	    } catch (Exception e) {
	        resp.setStatusCode(500);
	        resp.setError(e.getMessage());
	    }
	    
	    return resp;
	}


	
	public ReqRes login(ReqRes loginRequest) {
		ReqRes response = new ReqRes();
		try {
			authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), 
						loginRequest.getPassword()));
			var user = usersRepo.findByUsername(loginRequest.getUsername()).orElseThrow();
			var jwt = jwtUtils.generateToken(user);
			var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
			response.setStatusCode(200);
			response.setToken(jwt);
			response.setRole(user.getRole());;
			response.setRefreshToken(refreshToken);
			response.setExpirationTime("24Hrs");
			response.setMessage("Successfully logged in!");
		}catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	public ReqRes refreshToken (ReqRes refreshTokenReqiest){
		ReqRes response = new ReqRes();
		try{
			String ourUsername = jwtUtils.extractUsername (refreshTokenReqiest.getToken());
			user users = usersRepo.findByUsername(ourUsername).orElseThrow();
			if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
				var jwt = jwtUtils.generateToken(users);
				response.setStatusCode(200);
				response.setToken(jwt);
				response.setRefreshToken(refreshTokenReqiest.getToken());
				response.setExpirationTime("24Hr");
				response.setMessage("Successfully Refreshed Token");
			}
			response.setStatusCode(200);
			return response;
		}catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage(e.getMessage());
			return response;
		}
	}
	
	public ReqRes getAllUsers() {
		ReqRes reqRes = new ReqRes();
		
		try {
			List<user> result = usersRepo.findAll();
			if (!result.isEmpty()) {
				reqRes.setUserList(result);
				reqRes.setStatusCode (200);
				reqRes.setMessage("Successful");
			} else {
				reqRes.setStatusCode (404);
				reqRes.setMessage("No users found");
			}
			return reqRes;
		} catch (Exception e) {
			reqRes.setStatusCode (500);
			reqRes.setMessage("Error occurred: " + e.getMessage());
			return reqRes;
		}
	}
	
	public ReqRes getUsersById(long id) {
		ReqRes reqRes = new ReqRes();
		try {
			user usersById = usersRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
			reqRes.setUser(usersById);
			reqRes.setStatusCode(200);
			reqRes.setMessage("Users with id " + id + "found successfully");
		} catch (Exception e) {
			reqRes.setStatusCode (500);
			reqRes.setMessage("Error occurred: " + e.getMessage());
		}
		return reqRes;
	}
	
	public ReqRes deleteUserById(long id) {
	    ReqRes reqRes = new ReqRes();
	    try {
	        Optional<user> userOptional = usersRepo.findById(id);
	        if (userOptional.isPresent()) {
	            usersRepo.deleteById(id);
	            reqRes.setStatusCode(200);
	            reqRes.setMessage("User with id " + id + " deleted successfully");
	        } else {
	            reqRes.setStatusCode(404);
	            reqRes.setMessage("User with id " + id + " not found");
	        }
	    } catch (Exception e) {
	        reqRes.setStatusCode(500);
	        reqRes.setMessage("Error occurred: " + e.getMessage());
	    }
	    return reqRes;
	}
	
	public ReqRes updateUserById(long id, user updatedUser) {
	    ReqRes reqRes = new ReqRes();
	    try {
	        Optional<user> userOptional = usersRepo.findById(id);
	        if (userOptional.isPresent()) {
	            user existingUser = userOptional.get();
	            existingUser.setUsername(updatedUser.getUsername());
	            existingUser.setFname(updatedUser.getFname());
	            existingUser.setLname(updatedUser.getLname());
	            existingUser.setEmail(updatedUser.getEmail());
	            existingUser.setAddress(updatedUser.getAddress());
	            existingUser.setTel(updatedUser.getTel());
	            existingUser.setCreationDate(updatedUser.getCreationDate());
	            
	            // Check if the password exists and encode it if it does
	            String updatedPassword = updatedUser.getPassword();
	            if (updatedPassword != null && !updatedPassword.isEmpty()) {
	                String encodedPassword = passwordEncoder.encode(updatedPassword);
	                existingUser.setPassword(encodedPassword);
	            }

	            existingUser.setRole(updatedUser.getRole());

	            usersRepo.save(existingUser);
	            reqRes.setStatusCode(200);
	            reqRes.setMessage("User with id " + id + " updated successfully");
	            reqRes.setUser(existingUser); // Optionally return the updated user
	        } else {
	            reqRes.setStatusCode(404);
	            reqRes.setMessage("User with id " + id + " not found");
	        }
	    } catch (Exception e) {
	        reqRes.setStatusCode(500);
	        reqRes.setMessage("Error occurred: " + e.getMessage());
	    }
	    return reqRes;
	}
	
	public ReqRes getMyInfo(String username) {
	    ReqRes reqRes = new ReqRes();
	    try {
	        Optional<user> user = usersRepo.findByUsername(username);
	        if (user.isPresent()) {
	            reqRes.setUser(user.get());
	            reqRes.setStatusCode(200);
	            reqRes.setMessage("User information retrieved successfully");
	        } else {
	            reqRes.setStatusCode(404);
	            reqRes.setMessage("User with username " + username + " not found");
	        }
	    } catch (Exception e) {
	        reqRes.setStatusCode(500);
	        reqRes.setMessage("Error occurred: " + e.getMessage());
	    }
	    return reqRes;
	}


}
