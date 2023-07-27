package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.FeedItems;
import com.example.demo.Service.FeedItemService;
import com.example.demo.repository.FeedItemRepository;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
public class FeedController {

    @Autowired
    private final FeedItemRepository feedItemRepository;
    private final FeedItemService feedItemService;

    public FeedController(FeedItemRepository feedItemRepository, FeedItemService feedItemService) {
        this.feedItemRepository = feedItemRepository;
        this.feedItemService = feedItemService;
    }

    @GetMapping("/Feed/get")
    public List<FeedItems> getFeedData() {
        return feedItemService.getAllFeedItems();
    }
    
    @GetMapping("/Feed/getByUser/{user}")
    public List<FeedItems> getFeedDataByUser(@PathVariable String user) {
        return feedItemService.getFeedItemsByUser(user);
    }


    @PostMapping("/Feed/add")
    public void postDetails(
            @RequestParam("file") MultipartFile file,
            @RequestParam("text") String text,
            @RequestParam("user") String user,
            @RequestParam("comment") int comment,
            @RequestParam("date") String date

    ) {
        try {
            FeedItems e = new FeedItems();
            e.setContent(text);
            e.setUser(user);
            e.setComment(comment);
            e.setDate(date);

            if (!file.isEmpty()) {
                e.setImage(file.getBytes());
            }

            feedItemRepository.save(e);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    @PostMapping("/Feed/like/{pid}")
    public FeedItems likePost(@PathVariable int pid, @RequestBody boolean liked) {
        return feedItemService.likePost(pid, liked);
    }
}
