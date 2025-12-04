package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.UserAchievement;
import com.Gaming.Backend.entity.User;
import com.Gaming.Backend.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Long> {
    
    List<UserAchievement> findByUser(User user);
    
    List<UserAchievement> findByUserId(Long userId);
    
    List<UserAchievement> findByUserIdAndUnlockedTrue(Long userId);
    
    @Query("SELECT ua FROM UserAchievement ua WHERE ua.userId = :userId " +
           "AND ua.achievement.game.id = :gameId")
    List<UserAchievement> findByUserIdAndGameId(@Param("userId") Long userId, 
                                                  @Param("gameId") Long gameId);
    
    Optional<UserAchievement> findByUserAndAchievement(User user, Achievement achievement);
}
