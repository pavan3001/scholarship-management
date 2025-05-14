package com.example.jfsdsdp.controller;

import com.example.jfsdsdp.model.Admin;
import com.example.jfsdsdp.model.User;
import com.example.jfsdsdp.service.AdminService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000/")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        boolean isValid = adminService.validateAdmin(admin.getUsername(), admin.getPassword());

        if (isValid) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
    @GetMapping("/getusers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        boolean deleted = adminService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
