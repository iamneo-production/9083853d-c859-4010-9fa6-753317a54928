package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Comment;
import com.example.demo.repository.CommentRepo;

@CrossOrigin
@RestController
public class CommentController {
    private final CommentRepo crepo;

    @Autowired
    public CommentController(CommentRepo crepo) {
        this.crepo = crepo;
    }

    @GetMapping("/comment/get/{postId}")
    public List<Comment> getCmtData() {
        return crepo.findAll();
    }

    @PostMapping("/comment/add")
    public Comment addComment(@RequestBody Comment comment) {
        return crepo.save(comment);
    }

    
}