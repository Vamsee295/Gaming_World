package com.Gaming.Backend.controller;

import com.Gaming.Backend.dto.ActivityTrackingRequest;
import com.Gaming.Backend.entity.Game;
import com.Gaming.Backend.entity.User;
import com.Gaming.Backend.repository.GameRepository;
import com.Gaming.Backend.service.UserActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for tracking user activity
 * Receives activity events from frontend
 */
@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*") // Configure properly in production
public class UserActivityController {
    
    private final UserActivityService userActivityService;
    private final GameRepository gameRepository;
    
    /**
     * Track user activity (VIEW, CLICK, PURCHASE, WISHLIST)
     */
    @PostMapping("/track")
    public ResponseEntity<Void> trackActivity(
            @Valid @RequestBody ActivityTrackingRequest request,
            @AuthenticationPrincipal User user) {
        
        if (user == null) {
            log.warn("Activity tracking attempted without authentication");
            return ResponseEntity.ok().build(); // Silently ignore for unauthenticated users
        }
        
        log.info("Tracking {} activity for user {} on game {}", 
                request.getActivityType(), user.getId(), request.getGameId());
        
        // Get game genre for preference update
        String genre = null;
        var gameOpt = gameRepository.findById(request.getGameId());
        if (gameOpt.isPresent()) {
            genre = gameOpt.get().getGenre();
        }
        
        // Track activity
        userActivityService.trackActivity(
                user, 
                request.getGameId(), 
                request.getActivityType(), 
                genre
        );
        
        return ResponseEntity.ok().build();
    }
}
