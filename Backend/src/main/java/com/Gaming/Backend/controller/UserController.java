package com.Gaming.Backend.controller;

import com.Gaming.Backend.entity.User;
import com.Gaming.Backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "User management endpoints")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get user statistics", description = "Get total registered users and breakdown by role (Admin only)")
    public ResponseEntity<Map<String, Object>> getUserStats() {
        long totalUsers = userRepository.count();
        long adminCount = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.ADMIN)
                .count();
        long userCount = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.USER)
                .count();
        long activeUsers = userRepository.findAll().stream()
                .filter(User::getActive)
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("adminCount", adminCount);
        stats.put("userCount", userCount);
        stats.put("activeUsers", activeUsers);
        stats.put("inactiveUsers", totalUsers - activeUsers);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get all users", description = "Get list of all registered users (Admin only)")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        // Remove password before sending
        users.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(users);
    }
}
