package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="followTable")
public class Following {
	@Id
	@GeneratedValue
	private int fid;
	
    private String followl;
    private String followr;
	public int getFid() {
		return fid;
	}
	public void setFid(int fid) {
		this.fid = fid;
	}
	public String getFollowl() {
		return followl;
	}
	public void setFollowl(String followl) {
		this.followl = followl;
	}
	public String getFollowr() {
		return followr;
	}
	public void setFollowr(String followr) {
		this.followr = followr;
	}
   
}
