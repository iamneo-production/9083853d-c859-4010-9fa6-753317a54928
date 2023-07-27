package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="socialProfile")
public class Profile {
	
	@Id
	@Column(name="email")
	private String email;
	
	@Column(name="username")
	private String username;
	
	@Column(name="bio")
	private String bio;
	
	@Column(name="city")
	private String city;
	
	@Column(name="relation")
	private String relation;
	
	
	public String getemail() {
		return email;
	}
	
	public void setemail(String email) {
		this.email = email;
	}
	
	public String getUserName() {
		return username;
	}
	
	public void setUserName(String username) {
		this.username = username;
	}
	
	public String getBio() {
		return bio;
	}
	
	public void setBio(String bio) {
		this.bio = bio;
	}
	
	public String getCity() {
		return city;
	}
	
	public void setCity(String city) {
		this.city = city;
	}
	
	public String getRelation() {
		return relation;
	}
	
	public void setRelation(String relation) {
		this.relation = relation;
	}
	
	
	public Profile(String email, String username, String bio, String city,  String relation) {
		super();
		this.email = email;
		this.username = username;
		this.bio = bio;
		this.city = city;
		this.relation = relation;
	}
	
	public Profile() {
		
	}


}