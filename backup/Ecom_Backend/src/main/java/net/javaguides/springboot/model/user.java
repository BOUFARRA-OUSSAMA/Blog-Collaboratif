package net.javaguides.springboot.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import net.javaguides.springboot.enums.UserRole;

@Entity
@Table(name = "users")
public class user {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "first_name")
	private String fname;
	
	@Column(name = "last_name")
	private String lname;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "role")
	private UserRole role;
	
	public user() {
		
	}
	
	public user(long id, String fname, String lname, String email, UserRole role) {
		super();
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.email = email;
		this.role = role;
	}
	
	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
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

}
