package com.Gaming.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity to store aggregated user preferences based on game interactions
 * Tracks which genres users prefer based on their activity
 */
@Entity
@Table(name = "user_game_preference", 
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "genre"}),
    indexes = {
        @Index(name = "idx_user_interaction_count", columnList = "user_id,interaction_count")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGamePreference {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "genre", nullable = false, length = 50)
    private String genre;
    
    @Column(name = "interaction_count", nullable = false)
    private Integer interactionCount = 0;
    
    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;
    
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }
    
    /**
     * Increment the interaction count for this genre preference
     */
    public void incrementInteraction() {
        this.interactionCount++;
        this.lastUpdated = LocalDateTime.now();
    }
}
