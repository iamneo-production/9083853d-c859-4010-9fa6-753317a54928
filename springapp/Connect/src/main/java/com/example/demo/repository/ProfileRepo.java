package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entity.Profile;

public interface ProfileRepo extends JpaRepository<Profile,String> {
	
	@Query(value = "SELECT * FROM social_profile WHERE email LIKE %?1%", nativeQuery = true)
    List<Profile> findByEmailStartingWith(@Param("email") String email);

}
