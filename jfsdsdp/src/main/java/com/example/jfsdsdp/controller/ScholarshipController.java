package com.example.jfsdsdp.controller;

import com.example.jfsdsdp.model.Scholarship;
import com.example.jfsdsdp.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scholarships")
@CrossOrigin(origins = "http://localhost:3000")
public class ScholarshipController {

    @Autowired
    private ScholarshipService scholarshipService;

    @PostMapping("/add")
    public ResponseEntity<String> addScholarship(@RequestBody Scholarship scholarship) {
        scholarshipService.saveScholarship(scholarship);
        return ResponseEntity.ok("Scholarship added successfully!");
    }

    // New endpoint to retrieve all scholarships
    @GetMapping("/all")
    public ResponseEntity<List<Scholarship>> getAllScholarships() {
        List<Scholarship> scholarships = scholarshipService.getAllScholarships();
        return ResponseEntity.ok(scholarships);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScholarship(@PathVariable Long id) {
        scholarshipService.deleteScholarshipById(id);
        return ResponseEntity.noContent().build();
    }
}
