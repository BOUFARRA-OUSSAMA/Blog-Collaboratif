package net.javaguides.springboot.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.javaguides.springboot.dto.UserDto;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.mapper.UserMapper;
import net.javaguides.springboot.model.user;
import net.javaguides.springboot.repository.UserRepository;
import net.javaguides.springboot.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public UserDto createUser(UserDto userDto) {
		
		user user = UserMapper.mapToUser(userDto);
		user savedUser = userRepository.save(user);
		
		return UserMapper.mapToUserDto(savedUser);
	}

	@Override
	public UserDto getUserById(long userId) {
		user user = userRepository.findById(userId)
		.orElseThrow(() -> new ResourceNotFoundException("User does not exist with given ID: " + userId));
		return UserMapper.mapToUserDto(user);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<user> users = userRepository.findAll();
		
		return users.stream().map((user) -> UserMapper.mapToUserDto(user))
				.collect(Collectors.toList());
	}

	@Override
	public UserDto updateUser(long userId, UserDto updatedUser) {
		user user = userRepository.findById(userId).orElseThrow(
					() -> new ResourceNotFoundException("User does not exist with given Id: " + userId)
				);
		
		user.setUsername(updatedUser.getUsername()); // Updated field
        user.setFname(updatedUser.getFname());
        user.setLname(updatedUser.getLname());
        user.setEmail(updatedUser.getEmail());
        user.setRole(updatedUser.getRole());
        user.setAddress(updatedUser.getAddress()); // Updated field
        user.setTel(updatedUser.getTel()); // Updated field
        user.setCreationDate(updatedUser.getCreationDate()); // Updated field
     // Check if the password exists and encode it if it does
        String updatedPassword = updatedUser.getPassword();
        if (updatedPassword != null && !updatedPassword.isEmpty()) {
            String encodedPassword = passwordEncoder.encode(updatedPassword);
            user.setPassword(encodedPassword);
        }
		
		user updatedUserobj = userRepository.save(user);
		
		return UserMapper.mapToUserDto(updatedUserobj);
	}
	
	@Override
	public UserDto userUpdateUser(long userId, UserDto updatedUser) {
		user user = userRepository.findById(userId).orElseThrow(
					() -> new ResourceNotFoundException("User does not exist with given Id: " + userId)
				);
		
		user.setUsername(updatedUser.getUsername()); // Updated field
        user.setFname(updatedUser.getFname());
        user.setLname(updatedUser.getLname());
        user.setEmail(updatedUser.getEmail());
        user.setRole(updatedUser.getRole());
        user.setAddress(updatedUser.getAddress()); // Updated field
        user.setTel(updatedUser.getTel()); // Updated field
        user.setCreationDate(updatedUser.getCreationDate()); // Updated field
     // Check if the password exists and encode it if it does
        String updatedPassword = updatedUser.getPassword();
        if (updatedPassword != null && !updatedPassword.isEmpty()) {
            String encodedPassword = passwordEncoder.encode(updatedPassword);
            user.setPassword(encodedPassword);
        }
		
		user updatedUserobj = userRepository.save(user);
		
		return UserMapper.mapToUserDto(updatedUserobj);
	}

	@Override
	public void deleteUser(long userId) {
		
		user user = userRepository.findById(userId).orElseThrow(
				() -> new ResourceNotFoundException("User does not exist with given Id: " + userId)
			);
		
		userRepository.deleteById(userId);
	}
	

}
