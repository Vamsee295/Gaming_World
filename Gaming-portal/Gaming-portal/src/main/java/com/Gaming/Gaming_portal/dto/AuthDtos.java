package com.Gaming.Gaming_portal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 50)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;

    private String country;
}

@Data
class LoginRequest {
    @NotBlank
    private String usernameOrEmail;

    @NotBlank
    private String password;
}

@Data
class AuthResponse {
    private String token;
    private String username;
    private String role;
}

@Data
public class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String country;
    private String avatarUrl;
    private String theme;
    private String language;
    private Boolean notificationsEnabled;
}

@Data
public class UpdateProfileRequest {
    private String country;
    private String avatarUrl;
    private String theme;
    private String language;
    private Boolean notificationsEnabled;
}



