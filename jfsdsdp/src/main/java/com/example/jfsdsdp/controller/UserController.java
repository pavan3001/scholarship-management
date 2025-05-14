package com.example.jfsdsdp.controller;

import com.example.jfsdsdp.model.PasswordChangeRequest;
import com.example.jfsdsdp.model.PasswordResetRequest;
//import com.example.jfsdsdp.model.PasswordResetRequest;
import com.example.jfsdsdp.model.User;
import com.example.jfsdsdp.service.UserService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User loginUser) {
        User user = userService.findByEmail(loginUser.getEmail());
        Map<String, Object> response = new HashMap<>();
        
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            response.put("success", true);
            response.put("userId", user.getId());  // Return userId
        } else {
            response.put("success", false);
        }
        return response;
    }

    @PostMapping("/signup")
    public String signUp(@RequestBody User user) {
        userService.registerUser(user);
        return "User registered successfully!";
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestParam Long userId) {
        User user = userService.findById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // New PUT endpoint to update the user profile
    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody User updatedUser) {
        User user = userService.findById(updatedUser.getId());
        if (user != null) {
            // Update fields with the new data
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            user.setAadhar(updatedUser.getAadhar());
            user.setDob(updatedUser.getDob());
            user.setFatherName(updatedUser.getFatherName());
            user.setFatherPhone(updatedUser.getFatherPhone());
            user.setMotherName(updatedUser.getMotherName());
            user.setMotherPhone(updatedUser.getMotherPhone());
            user.setCollege(updatedUser.getCollege());
            user.setCgpa(updatedUser.getCgpa());
            user.setUserType(updatedUser.getUserType());

            // Save the updated user to the database
            userService.save(user);
            return ResponseEntity.ok("Profile updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }
    @PutMapping("/changepassword")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequest request) {
        User user = userService.findById(request.getUserId());
        if (user != null && user.getPassword().equals(request.getCurrentPassword())) {
            // Update the password if current password matches
            user.setPassword(request.getNewPassword());
            userService.save(user);
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Current password is incorrect.");
        }
    }
    @PostMapping("/resetpassword")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest request) {
        boolean success = userService.resetPassword(request.getEmail(), request.getNewPassword());
        if (success) {
            return ResponseEntity.ok("Password updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update password");
        }
    }


}
