package com.Gaming.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity to track user interactions with games
 * Stores activities like VIEW, CLICK, PURCHASE, WISHLIST
 */
@Entity
@Table(name = "user_activity", indexes = {
    @Index(name = "idx_user_timestamp", columnList = "user_id,timestamp"),
    @Index(name = "idx_user_activity_type", columnList = "user_id,activity_type")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserActivity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "game_id", nullable = false)
    private Long gameId;
    
    @Column(name = "activity_type", nullable = false, length = 20)
    private String activityType; // VIEW, CLICK, PURCHASE, WISHLIST
    
    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;
    
    @PrePersist
    protected void onCreate() {
        if (timestamp == null) {
            timestamp = LocalDateTime.now();
        }
    }
}
