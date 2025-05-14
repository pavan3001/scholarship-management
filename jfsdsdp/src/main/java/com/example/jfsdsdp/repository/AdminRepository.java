package com.example.jfsdsdp.repository;

import com.example.jfsdsdp.model.Admin;
import com.example.jfsdsdp.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);

    // Custom query to fetch all students
    @Query("SELECT s FROM User s")
    List<User> findAllUsers();
}
