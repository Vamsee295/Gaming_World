package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.UserActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for UserActivity entity
 * Provides methods to query user interaction history
 */
@Repository
public interface UserActivityRepository extends JpaRepository<UserActivity, Long> {
    
    /**
     * Find all activities for a user, ordered by most recent
     */
    List<UserActivity> findByUserIdOrderByTimestampDesc(Long userId);
    
    /**
     * Find top N activities for a user by activity type
     */
    List<UserActivity> findTop10ByUserIdAndActivityTypeOrderByTimestampDesc(Long userId, String activityType);
    
    /**
     * Count how many times a user interacted with a specific game
     */
    Long countByUserIdAndGameId(Long userId, Long gameId);
    
    /**
     * Get unique game IDs viewed by user (for "Continue Where You Left Off")
     */
    @Query("SELECT DISTINCT ua.gameId FROM UserActivity ua WHERE ua.user.id = :userId AND ua.activityType IN :activityTypes ORDER BY ua.timestamp DESC")
    List<Long> findDistinctGameIdsByUserIdAndActivityTypes(@Param("userId") Long userId, @Param("activityTypes") List<String> activityTypes);
    
    /**
     * Get most recently viewed games (limit 4 for "Continue Where You Left Off")
     */
    @Query(value = "SELECT DISTINCT ua.game_id FROM user_activity ua WHERE ua.user_id = :userId AND ua.activity_type IN :activityTypes ORDER BY ua.timestamp DESC LIMIT :limit", nativeQuery = true)
    List<Long> findRecentGameIds(@Param("userId") Long userId, @Param("activityTypes") List<String> activityTypes, @Param("limit") int limit);
}
