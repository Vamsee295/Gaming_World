package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.Achievement;
import com.Gaming.Backend.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    
    List<Achievement> findByGame(Game game);
    
    List<Achievement> findByGameId(Long gameId);
}
