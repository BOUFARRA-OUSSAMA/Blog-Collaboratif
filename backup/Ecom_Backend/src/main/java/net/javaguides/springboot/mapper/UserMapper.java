package net.javaguides.springboot.mapper;

import net.javaguides.springboot.dto.UserDto;
import net.javaguides.springboot.model.user;

public class UserMapper {
	
	public static UserDto mapToUserDto(user user) {
		
		return new UserDto(
				user.getId(),
				user.getFname(),
				user.getLname(),
				user.getEmail(),
				user.getRole()
				);
	}
	
	public static user mapTouser(UserDto userDto) {
		return new user(
				userDto.getId(),
				userDto.getFname(),
				userDto.getLname(),
				userDto.getEmail(),
				userDto.getRole()
				);
	}

}
