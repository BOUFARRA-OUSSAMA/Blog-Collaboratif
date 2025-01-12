package net.javaguides.springboot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.dto.ReqRes;
import net.javaguides.springboot.dto.UserDto;
import net.javaguides.springboot.model.Cart;
import net.javaguides.springboot.service.UserService;
import net.javaguides.springboot.service.UsersManagementService;

@CrossOrigin("*")
@RestController
public class UserController {
	
	
	@Autowired
	private UsersManagementService usersManagementService;
	
	@PostMapping("/auth/register")
	public ResponseEntity<ReqRes> regeister(@RequestBody ReqRes reg) {
		return ResponseEntity.ok(usersManagementService.register(reg));
	}
	@PostMapping("/auth/login")
		public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
		return ResponseEntity.ok(usersManagementService.login(req));
	}
	
	@PostMapping("/auth/refresh")
	public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
	return ResponseEntity.ok(usersManagementService.refreshToken(req));
	}
	
	@GetMapping("/adminuser/get-profile")
	public ResponseEntity<ReqRes> getMyProfile(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		ReqRes response = usersManagementService.getMyInfo(username);
		return ResponseEntity.status(response.getStatusCode()).body (response);
	}
	
	
	
	private UserService userService;
	
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	//Build Add user REST API
	@PostMapping("/U")
	public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
	    // Create a new cart for the user
	    Cart cart = new Cart();
	    userDto.setCart(cart); // Set the cart in the user DTO
	    UserDto savedUser = userService.createUser(userDto);
	    return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}

	
	//Build Get user REST API
	@GetMapping("/admin/get-user/{id}")
	public ResponseEntity<UserDto> getuserById(@PathVariable("id") long userId){
		UserDto userDto = userService.getUserById(userId);
		return ResponseEntity.ok(userDto);
	}
	
	//Build Get All user REST API
	@GetMapping("/admin/get-all-users")
	public ResponseEntity<List <UserDto>> getAllUsers(){
		List<UserDto> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}
	
	//Build Update user REST API
	@PutMapping("/admin/update-user/{id}")
	public ResponseEntity<UserDto> updateUser(@PathVariable("id") long userId, @RequestBody UserDto updatedUser){
		UserDto userDto = userService.updateUser(userId, updatedUser);
		return ResponseEntity.ok(userDto);
	}
	
	@PutMapping("/user/update-user/{id}")
	public ResponseEntity<UserDto> userUpdateUser(@PathVariable("id") long userId, @RequestBody UserDto updatedUser){
		UserDto userDto = userService.updateUser(userId, updatedUser);
		return ResponseEntity.ok(userDto);
	}
	
	//Build Delete user REST API
	@DeleteMapping("/admin/delete-user/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") long userId){
		userService.deleteUser(userId);
		return ResponseEntity.ok("Employee deleted successfully");
	}
	



}
