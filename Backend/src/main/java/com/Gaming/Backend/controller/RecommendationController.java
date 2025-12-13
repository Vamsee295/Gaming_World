package com.Gaming.Backend.controller;

import com.Gaming.Backend.dto.GameDTO;
import com.Gaming.Backend.entity.User;
import com.Gaming.Backend.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for personalized game recommendations
 * Provides 8 different recommendation endpoints for the homepage
 */
@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*") // Configure properly in production
public class RecommendationController {
    
    private final RecommendationService recommendationService;
    
    /**
     * Get personalized recommendations based on user preferences
     * Requires authentication
     */
    @GetMapping("/for-you")
    public ResponseEntity<List<GameDTO>> getRecommendedGames(
            @AuthenticationPrincipal User user) {
        
        if (user == null) {
            // Return empty for unauthenticated users
            return ResponseEntity.ok(List.of());
        }
        
        log.info("Getting recommended games for user {}", user.getId());
        List<GameDTO> games = recommendationService.getRecommendedGames(user.getId());
        return ResponseEntity.ok(games);
    }
    
    /**
     * Get "Continue Where You Left Off" recommendations
     * Requires authentication
     */
    @GetMapping("/continue-playing")
    public ResponseEntity<List<GameDTO>> getContinuePlaying(
            @AuthenticationPrincipal User user) {
        
        if (user == null) {
            return ResponseEntity.ok(List.of());
        }
        
        log.info("Getting continue playing games for user {}", user.getId());
        List<GameDTO> games = recommendationService.getContinueWhereYouLeftOff(user.getId());
        return ResponseEntity.ok(games);
    }
    
    /**
     * Get contextual recommendations based on a viewed game
     */
    @GetMapping("/because-you-viewed/{gameId}")
    public ResponseEntity<List<GameDTO>> getBecauseYouViewed(
            @PathVariable Long gameId,
            @AuthenticationPrincipal User user) {
        
        Long userId = (user != null) ? user.getId() : null;
        
        log.info("Getting 'because you viewed' games for game {}", gameId);
        List<GameDTO> games = recommendationService.getBecauseYouViewedGames(userId, gameId);
        return ResponseEntity.ok(games);
    }
    
    /**
     * Get personalized deals based on user preferences
     */
    @GetMapping("/personalized-deals")
    public ResponseEntity<List<GameDTO>> getPersonalizedDeals(
            @AuthenticationPrincipal User user) {
        
        if (user == null) {
            return ResponseEntity.ok(List.of());
        }
        
        log.info("Getting personalized deals for user {}", user.getId());
        List<GameDTO> games = recommendationService.getPersonalizedDeals(user.getId());
        return ResponseEntity.ok(games);
    }
    
    /**
     * Get trending games (public endpoint)
     */
    @GetMapping("/trending")
    public ResponseEntity<List<GameDTO>> getTrendingGames() {
        log.info("Getting trending games");
        List<GameDTO> games = recommendationService.getTrendingGames();
        return ResponseEntity.ok(games);
    }
    
    /**
     * Get editor's choice games (public endpoint)
     */
    @GetMapping("/editor-choice")
    public ResponseEntity<List<GameDTO>> getEditorChoice() {
        log.info("Getting editor's choice games");
        List<GameDTO> games = recommendationService.getEditorChoiceGames();
        return ResponseEntity.ok(games);
    }
    
    /**
     * Get recently released games (public endpoint)
     */
    @GetMapping("/recently-released")
    public ResponseEntity<List<GameDTO>> getRecentlyReleased() {
        log.info("Getting recently released games");
        List<GameDTO> games = recommendationService.getRecentlyReleasedGames();
        return ResponseEntity.ok(games);
    }
    
    /**
     * Get budget-friendly games (public endpoint)
     */
    @GetMapping("/budget-games")
    public ResponseEntity<List<GameDTO>> getBudgetGames() {
        log.info("Getting budget games");
        List<GameDTO> games = recommendationService.getBudgetGames();
        return ResponseEntity.ok(games);
    }
}
