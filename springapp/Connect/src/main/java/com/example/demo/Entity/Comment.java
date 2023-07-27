package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Comment")
public class Comment {
	
	@Id
	@GeneratedValue
	private int CommentId;
	private int postId;
	private String content;
	private String date;
	private String CommentedBy;

	
	public String getCommentedBy() {
		return CommentedBy;
	}
	public void setCommentedBy(String commentedBy) {
		CommentedBy = commentedBy;
	}
	public int getCommentId() {
		return CommentId;
	}
	public void setCommentId(int commentId) {
		CommentId = commentId;
	}
	public int getPostId() {
		return postId;
	}
	public void setPostId(int postId) {
		this.postId = postId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
}
