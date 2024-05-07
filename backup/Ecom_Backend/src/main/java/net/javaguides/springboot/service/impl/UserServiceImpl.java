package net.javaguides.springboot.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import net.javaguides.springboot.dto.UserDto;
import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.mapper.UserMapper;
import net.javaguides.springboot.model.user;
import net.javaguides.springboot.repository.UserRepository;
import net.javaguides.springboot.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	private UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@Override
	public UserDto createUser(UserDto userDto) {
		
		user user = UserMapper.mapTouser(userDto);
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
	public List<UserDto> getAllEmployees() {
		List<user> users = userRepository.findAll();
		
		return users.stream().map((user) -> UserMapper.mapToUserDto(user))
				.collect(Collectors.toList());
	}

	@Override
	public UserDto updateUser(long userId, UserDto updatedUser) {
		user user = userRepository.findById(userId).orElseThrow(
					() -> new ResourceNotFoundException("User does not exist with given Id: " + userId)
				);
		
		user.setFname(updatedUser.getFname());
		user.setLname(updatedUser.getLname());
		user.setEmail(updatedUser.getEmail());
		user.setRole(updatedUser.getRole());
		
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
