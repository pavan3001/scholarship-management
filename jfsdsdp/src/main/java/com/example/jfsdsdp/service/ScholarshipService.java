package com.example.jfsdsdp.service;

import com.example.jfsdsdp.model.Scholarship;
import com.example.jfsdsdp.repository.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScholarshipService {

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    public Scholarship saveScholarship(Scholarship scholarship) {
        return scholarshipRepository.save(scholarship);
    }

    // New method to retrieve all scholarships
    public List<Scholarship> getAllScholarships() {
        return scholarshipRepository.findAll();
    }
    public void deleteScholarshipById(Long id) {
        scholarshipRepository.deleteById(id);
    }
}
