package net.javaguides.springboot.dto;

import net.javaguides.springboot.enums.UserRole;

public class UserDto {
	
	private long id;
	private String fname;
	private String lname;
	private String email;
	private UserRole role;
	
	public UserDto(long id, String fname, String lname, String email, UserRole role) {
		super();
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.role = role;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

}
