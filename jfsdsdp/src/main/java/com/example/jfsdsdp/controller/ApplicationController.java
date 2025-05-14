package com.example.jfsdsdp.controller;
import com.example.jfsdsdp.model.Application;
import com.example.jfsdsdp.service.ApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitApplication(@RequestBody Application application) {
        applicationService.saveApplication(application);
        return ResponseEntity.ok("Application submitted successfully!");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Application>> getAllApplications() {
        List<Application> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateApplicationStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        applicationService.updateApplicationStatus(id, status);
        return ResponseEntity.ok("Application status updated to " + status);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<Application>> getApplicationsByEmail(@PathVariable String email) {
        List<Application> applications = applicationService.getApplicationsByEmail(email);
        return ResponseEntity.ok(applications);
    }

    @DeleteMapping("/{applicationId}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long applicationId) {
        applicationService.deleteApplication(applicationId);
        return ResponseEntity.ok("Application deleted successfully.");
    }
}
