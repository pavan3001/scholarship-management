package com.example.jfsdsdp.service;

import com.example.jfsdsdp.model.Admin;
import com.example.jfsdsdp.model.User;
import com.example.jfsdsdp.repository.AdminRepository;
import com.example.jfsdsdp.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    
    @Autowired
    private UserRepository userRepository;

    public boolean validateAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        return admin != null && admin.getPassword().equals(password);
    }
    public List<User> getAllUsers() {
        return adminRepository.findAllUsers();
    }
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
