package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.FeedItems;
import com.example.demo.Entity.Profile;
import com.example.demo.repository.ProfileRepo;

@Service
public class ProfileService {

	@Autowired
	private ProfileRepo emp;

//	public Profile getAllDetails()
//	{
//		return emp.findAll();
//	}
	
	public Optional<Profile> getDetailsId(String Id)
	{
		return emp.findById(Id);
	}
	
	
	public Profile saveDetails(Profile e) 
	{
		return emp.save(e);
	}
	
	public List<Profile> getDetailsId1(String email)
	{
		return emp.findByEmailStartingWith(email);
	}
	
//	public void postLike(int postId) {
//		emp.likePost(postId);
//	}
	
	
}