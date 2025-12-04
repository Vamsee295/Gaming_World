package com.Gaming.Backend.controller;

import com.Gaming.Backend.dto.ApiResponse;
import com.Gaming.Backend.dto.auth.LoginRequest;
import com.Gaming.Backend.dto.auth.LoginResponse;
import com.Gaming.Backend.dto.auth.SignupRequest;
import com.Gaming.Backend.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication and user registration endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    @Operation(summary = "Register a new user", description = "Create a new user account with username, email, and password")
    public ResponseEntity<LoginResponse> signup(@Valid @RequestBody SignupRequest request) {
        LoginResponse response = authService.signup(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticate user and receive JWT token")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Logout current user (client should delete token)")
    public ResponseEntity<ApiResponse> logout() {
        // With JWT, logout is handled client-side by deleting the token
        return ResponseEntity.ok(new ApiResponse(true, "Logged out successfully"));
    }
}
