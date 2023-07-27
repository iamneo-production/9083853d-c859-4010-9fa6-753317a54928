package com.example.demo.Service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.FeedItems;
import com.example.demo.repository.FeedItemRepository;

@Service
public class FeedItemService {

    private final FeedItemRepository repo;

    public FeedItemService(FeedItemRepository repo) {
        this.repo = repo;
    }

    public FeedItems likePost(int pid, boolean liked) {
        FeedItems feedItem = repo.findById(pid).orElse(null);
        if (feedItem == null) {
            throw new IllegalArgumentException("Invalid post ID: " + pid);
        }

        if (liked) {
            // If liked, increment the like count
            feedItem.setLikeCount(feedItem.getLikeCount() + 1);
        } else {
            // If unliked, decrement the like count (if not already zero)
            int likeCount = feedItem.getLikeCount() - 1;
            feedItem.setLikeCount(likeCount >= 0 ? likeCount : 0);
        }

        // Save the updated FeedItem to the repository
        return repo.save(feedItem);
    }
    
    public List<FeedItems> getAllFeedItems() {
        Sort sort = Sort.by(Sort.Direction.DESC, "pid");
        List<FeedItems> feedItems = repo.findAll(sort);
        return feedItems;
    }
    
    public List<FeedItems> getFeedItemsByUser(String user) {
        return FeedItemRepository.findByUser(user);
    }


    // Add more methods for specific operations related to FeedItems if needed
}
