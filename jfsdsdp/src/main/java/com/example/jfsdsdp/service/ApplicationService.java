package com.example.jfsdsdp.service;
import com.example.jfsdsdp.model.Application;
import com.example.jfsdsdp.repository.ApplicationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    public void updateApplicationStatus(Long id, String status) {
        Optional<Application> optionalApplication = applicationRepository.findById(id);

        if (optionalApplication.isPresent()) {
            Application application = optionalApplication.get();
            application.setStatus(status);
            applicationRepository.save(application);
        } else {
            throw new RuntimeException("Application not found with ID: " + id);
        }
    }

    public List<Application> getApplicationsByEmail(String email) {
        return applicationRepository.findByEmail(email);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public void deleteApplication(Long applicationId) {
        if (applicationRepository.existsById(applicationId)) {
            System.out.println("Deleting application with ID: " + applicationId);
            applicationRepository.deleteById(applicationId);
        } else {
            System.out.println("Application not found with ID: " + applicationId);
            throw new RuntimeException("Application not found with ID: " + applicationId);
        }
    }

}
