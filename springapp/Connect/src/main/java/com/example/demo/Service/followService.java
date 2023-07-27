package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Following;
import com.example.demo.followRepo.followRepo;

@Service
public class followService {

	@Autowired
	private followRepo fol;

//	public Profile getAllDetails()
//	{
//		return emp.findAll();
//	}
	
//	public Optional<Following> getDetailsId(String email)
//	{
//		return emp.findById(email);
//	}
//	public List<Following> getDetailsId()
//	{
//		Sort sort  = Sort.by(Sort.Direction.DESC, "");
//		return emp.findAll(sort);
//	}
	
	 public List<Following> getDetailsId(String followl) {
	        return fol.findByUsername(followl);
	    }
	 
	 public List<Following> getDetailsId1(String followr) {
	        return fol.findByUsername1(followr);
	    }
	 
	 public List<Following> getFollowDetailsId1(String followl, String followr) {
	        return fol.findByUsername2(followl, followr);
	    }
	
	 public void deleteDetailsBy(String followl, String followr) {
		 fol.deleteByFollowlAndFollowr(followl, followr);
	 }
	 
	 public void deleteDetailsId1(int fid) {
		 fol.deleteById(fid);
	 }
	
	public Following saveDetails(Following e) 
	{
		return fol.save(e);
	}
	
//	public void postLike(int postId) {
//		emp.likePost(postId);
//	}
}