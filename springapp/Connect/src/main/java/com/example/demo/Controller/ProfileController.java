package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.Entity.Profile;
import com.example.demo.Service.ProfileService;

@CrossOrigin
@RestController
public class ProfileController {

	@Autowired
	private ProfileService ser;
	

	
	@PostMapping("/info/add")
	public void postDetails(@RequestBody Profile e)
	{
		ser.saveDetails(e);
	}
	
	@GetMapping("/info/get/{Id}")
	public Optional<Profile> getDetailsById(@PathVariable String Id)
	{
		return ser.getDetailsId(Id);
	}
	
	@GetMapping("/info/getall/{Id}")
	public List<Profile> getDetailsById1(@PathVariable String Id)
	{
		return ser.getDetailsId1(Id);
	}
	
	

	
}