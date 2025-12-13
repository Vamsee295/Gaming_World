package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.UserGamePreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for UserGamePreference entity
 * Manages user genre preferences and interaction counts
 */
@Repository
public interface UserGamePreferenceRepository extends JpaRepository<UserGamePreference, Long> {
    
    /**
     * Find all preferences for a user, ordered by interaction count (most preferred first)
     */
    List<UserGamePreference> findByUserIdOrderByInteractionCountDesc(Long userId);
    
    /**
     * Find a specific genre preference for a user
     */
    Optional<UserGamePreference> findByUserIdAndGenre(Long userId, String genre);
    
    /**
     * Get top N preferred genres for a user
     */
    @Query("SELECT ugp.genre FROM UserGamePreference ugp WHERE ugp.user.id = :userId ORDER BY ugp.interactionCount DESC")
    List<String> findTopGenresByUserId(@Param("userId") Long userId);
}
