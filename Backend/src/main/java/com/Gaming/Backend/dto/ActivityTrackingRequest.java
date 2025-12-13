package com.Gaming.Backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for tracking user activity
 * Received from frontend when user interacts with games
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityTrackingRequest {
    
    @NotNull(message = "Game ID is required")
    private Long gameId;
    
    @NotBlank(message = "Activity type is required")
    private String activityType; // VIEW, CLICK, PURCHASE, WISHLIST
    
    /**
     * Enum for valid activity types
     */
    public enum ActivityType {
        VIEW,      // User viewed game details
        CLICK,     // User clicked on game card
        PURCHASE,  // User purchased game
        WISHLIST   // User added to wishlist
    }
}
