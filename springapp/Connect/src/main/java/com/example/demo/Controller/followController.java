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
import com.example.demo.Entity.Following;
import com.example.demo.Entity.Profile;
import com.example.demo.Service.followService;

@CrossOrigin
@RestController
public class followController {

	@Autowired
	private followService foll;
	
//	@GetMapping("/Profile/get")
//	public List<Feed> getDetails()
//	{
//		return ser.getAllDetails();
//	}
	
	@PostMapping("/Followers/add")
	public void postDetails(@RequestBody Following e)
	{
		foll.saveDetails(e);
//		return "Bank Details Added Successfully";
	}
	
	@GetMapping("/Following/get/{followl}")
	public List<Following> getDetailsById(@PathVariable String followl)
	{
		return foll.getDetailsId(followl);
	}
	
	@GetMapping("/Follower/get/{followr}")
	public List<Following> getDetailsById1(@PathVariable String followr)
	{
		return foll.getDetailsId1(followr);
	}
	
	@GetMapping("/Following1/get/{followl}/{followr}")
	public List<Following> getDetailsById1(@PathVariable String followl, @PathVariable String followr)
	{
		return foll.getFollowDetailsId1(followl, followr);
	}
	
	@DeleteMapping("/Following/delete/{followl}/{followr}")
	public void deleteById(@PathVariable String followl, @PathVariable String followr) {
		foll.deleteDetailsBy(followl, followr);
	}
	
	@DeleteMapping("/Following/delete/{fid}")
	public void getDetailsById1(@PathVariable int fid)
	{
		 foll.deleteDetailsId1(fid);
	}
	
//	@PostMapping("/Feed/like/{postId}")
//	public void postLike(@PathVariable int postId) {
//		ser.postLike(postId);
//	}
	
}