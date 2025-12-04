package com.Gaming.Gaming_portal.controller;

import com.Gaming.Gaming_portal.dto.UpdateProfileRequest;
import com.Gaming.Gaming_portal.dto.UserProfileResponse;
import com.Gaming.Gaming_portal.model.User;
import com.Gaming.Gaming_portal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMe(@AuthenticationPrincipal User user) {
        UserProfileResponse resp = new UserProfileResponse();
        resp.setId(user.getId());
        resp.setUsername(user.getUsername());
        resp.setEmail(user.getEmail());
        resp.setCountry(user.getCountry());
        resp.setAvatarUrl(user.getAvatarUrl());
        resp.setTheme(user.getTheme());
        resp.setLanguage(user.getLanguage());
        resp.setNotificationsEnabled(user.getNotificationsEnabled());
        return ResponseEntity.ok(resp);
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateMe(
            @AuthenticationPrincipal User user,
            @RequestBody UpdateProfileRequest request
    ) {
        if (request.getCountry() != null) user.setCountry(request.getCountry());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());
        if (request.getTheme() != null) user.setTheme(request.getTheme());
        if (request.getLanguage() != null) user.setLanguage(request.getLanguage());
        if (request.getNotificationsEnabled() != null) user.setNotificationsEnabled(request.getNotificationsEnabled());

        userRepository.save(user);
        return getMe(user);
    }
}



