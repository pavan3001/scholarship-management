package com.example.jfsdsdp.repository;
import com.example.jfsdsdp.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByEmail(String email);
}
