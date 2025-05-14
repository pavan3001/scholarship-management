package com.example.jfsdsdp.repository;

import com.example.jfsdsdp.model.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
    // No need to add additional methods for basic CRUD operations.
}
