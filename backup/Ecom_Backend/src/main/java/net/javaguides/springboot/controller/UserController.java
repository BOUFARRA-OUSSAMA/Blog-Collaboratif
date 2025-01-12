package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.dto.UserDto;
import net.javaguides.springboot.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	//Build Add user REST API
	@PostMapping
	public ResponseEntity<UserDto> createuser(@RequestBody UserDto userDto){
		UserDto savedUser = userService.createUser(userDto);
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	}
	
	//Build Get user REST API
	@GetMapping("{id}")
	public ResponseEntity<UserDto> getuserById(@PathVariable("id") long userId){
		UserDto userDto = userService.getUserById(userId);
		return ResponseEntity.ok(userDto);
	}
	
	//Build Get All user REST API
	@GetMapping
	public ResponseEntity<List <UserDto>> getAllUsers(){
		List<UserDto> users = userService.getAllEmployees();
		return ResponseEntity.ok(users);
	}
	
	//Build Update user REST API
	@PutMapping("{id}")
	public ResponseEntity<UserDto> updateUser(@PathVariable("id") long userId, @RequestBody UserDto updatedUser){
		UserDto userDto = userService.updateUser(userId, updatedUser);
		return ResponseEntity.ok(userDto);
	}
	
	//Build Delete user REST API
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") long userId){
		userService.deleteUser(userId);
		return ResponseEntity.ok("Employee deleted successfully");
	}


}
