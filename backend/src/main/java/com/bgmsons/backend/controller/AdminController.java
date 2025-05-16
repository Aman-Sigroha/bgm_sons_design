package com.bgmsons.backend.controller;

import com.bgmsons.backend.model.Admin;
import com.bgmsons.backend.repository.AdminRepository;
import com.bgmsons.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");
        Admin admin = adminRepository.findByUsername(username);
        Map<String, Object> response = new HashMap<>();
        if (admin != null && admin.getPassword().equals(password)) {
            String token = JwtUtil.generateToken(username);
            response.put("success", true);
            response.put("message", "Admin login successful");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid admin credentials");
            return ResponseEntity.status(401).body(response);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAdminCredentials(@RequestBody Map<String, String> updateRequest) {
        String currentUsername = updateRequest.get("currentUsername");
        String currentPassword = updateRequest.get("currentPassword");
        String newUsername = updateRequest.get("newUsername");
        String newPassword = updateRequest.get("newPassword");
        Map<String, Object> response = new HashMap<>();
        Admin admin = adminRepository.findByUsername(currentUsername);
        if (admin != null && admin.getPassword().equals(currentPassword)) {
            admin.setUsername(newUsername);
            admin.setPassword(newPassword);
            adminRepository.save(admin);
            response.put("success", true);
            response.put("message", "Admin credentials updated successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Invalid current admin credentials");
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> adminSignup(@RequestBody Map<String, String> signupRequest) {
        String username = signupRequest.get("username");
        String password = signupRequest.get("password");
        Map<String, Object> response = new HashMap<>();
        if (adminRepository.findByUsername(username) != null) {
            response.put("success", false);
            response.put("message", "Admin with this username already exists");
            return ResponseEntity.badRequest().body(response);
        }
        Admin newAdmin = new Admin();
        newAdmin.setUsername(username);
        newAdmin.setPassword(password);
        adminRepository.save(newAdmin);
        response.put("success", true);
        response.put("message", "Admin created successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        if (JwtUtil.isTokenValid(token)) {
            return ResponseEntity.ok().body("Token is valid");
        } else {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }
} 