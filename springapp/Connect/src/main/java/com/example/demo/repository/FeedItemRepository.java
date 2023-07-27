package com.example.demo.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.FeedItems;

public interface FeedItemRepository extends JpaRepository<FeedItems, Integer> {
    List<FeedItems> findAll(Sort sort);
    static List<FeedItems> findByUser(String user) {
		// TODO Auto-generated method stub
		return null;
	}
}
