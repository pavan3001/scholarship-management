package com.example.jfsdsdp.service;
import com.example.jfsdsdp.model.User;
import com.example.jfsdsdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void registerUser(User user) {
        userRepository.save(user);
    }

    // New save method for updating an existing user
    public void save(User user) {
        userRepository.save(user);
    }
    public boolean resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // Directly set the new password without encryption
            user.setPassword(newPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }
    public String getEmailById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return (user != null) ? user.getEmail() : null; // Return email if user exists
    }
    
}
