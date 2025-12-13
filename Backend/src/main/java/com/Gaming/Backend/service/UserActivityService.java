package com.Gaming.Backend.service;

import com.Gaming.Backend.entity.User;
import com.Gaming.Backend.entity.UserActivity;
import com.Gaming.Backend.entity.UserGamePreference;
import com.Gaming.Backend.repository.UserActivityRepository;
import com.Gaming.Backend.repository.UserGamePreferenceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for tracking and managing user activity
 * Handles user interactions with games and updates preferences
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserActivityService {
    
    private final UserActivityRepository userActivityRepository;
    private final UserGamePreferenceRepository userGamePreferenceRepository;
    
    /**
     * Track a user activity (VIEW, CLICK, PURCHASE, WISHLIST)
     */
    @Transactional
    public void trackActivity(User user, Long gameId, String activityType, String genre) {
        // Save activity
        UserActivity activity = new UserActivity();
        activity.setUser(user);
        activity.setGameId(gameId);
        activity.setActivityType(activityType);
        activity.setTimestamp(LocalDateTime.now());
        
        userActivityRepository.save(activity);
        log.debug("Tracked {} activity for user {} on game {}", activityType, user.getId(), gameId);
        
        // Update user preferences if genre is provided
        if (genre != null && !genre.isEmpty()) {
            updateUserPreferences(user.getId(), genre);
        }
    }
    
    /**
     * Update user's genre preferences
     */
    @Transactional
    public void updateUserPreferences(Long userId, String genre) {
        var preferenceOpt = userGamePreferenceRepository.findByUserIdAndGenre(userId, genre);
        
        if (preferenceOpt.isPresent()) {
            // Increment existing preference
            UserGamePreference preference = preferenceOpt.get();
            preference.incrementInteraction();
            userGamePreferenceRepository.save(preference);
            log.debug("Updated preference for user {} genre {}: count={}", userId, genre, preference.getInteractionCount());
        } else {
            // Create new preference
            UserGamePreference newPreference = new UserGamePreference();
            newPreference.setUser(new User()); // Set user reference
            newPreference.getUser().setId(userId);
            newPreference.setGenre(genre);
            newPreference.setInteractionCount(1);
            newPreference.setLastUpdated(LocalDateTime.now());
            userGamePreferenceRepository.save(newPreference);
            log.debug("Created new preference for user {} genre {}", userId, genre);
        }
    }
    
    /**
     * Get user's preferred genres ordered by interaction count
     */
    public List<String> getUserPreferredGenres(Long userId) {
        return userGamePreferenceRepository.findTopGenresByUserId(userId);
    }
    
    /**
     * Get recently viewed game IDs for "Continue Where You Left Off"
     */
    public List<Long> getRecentlyViewedGameIds(Long userId, int limit) {
        List<String> activityTypes = List.of("VIEW", "CLICK");
        return userActivityRepository.findRecentGameIds(userId, activityTypes, limit);
    }
}
