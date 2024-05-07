package net.javaguides.springboot.mapper;

import net.javaguides.springboot.dto.UserDto;
import net.javaguides.springboot.model.user;

public class UserMapper {
    
    public static UserDto mapToUserDto(user user) {
        
        return new UserDto(
                user.getId(),
                user.getUsername(),
                user.getFname(),
                user.getLname(),
                user.getEmail(),
                user.getAddress(),
                user.getTel(),
                user.getCreationDate(),
                user.getPassword(),
                user.getRole(),
                user.getCart(), // Add cart mapping
                user.getOrders() // Add orders mapping
                );
    }
    
    public static user mapToUser(UserDto userDto) {
        user user = new user();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setFname(userDto.getFname());
        user.setLname(userDto.getLname());
        user.setEmail(userDto.getEmail());
        user.setAddress(userDto.getAddress());
        user.setTel(userDto.getTel());
        user.setCreationDate(userDto.getCreationDate());
        user.setPassword(userDto.getPassword());
        user.setRole(userDto.getRole());
        user.setCart(userDto.getCart()); // Add cart mapping
        user.setOrders(userDto.getOrders()); // Add orders mapping
        return user;
    }
}
