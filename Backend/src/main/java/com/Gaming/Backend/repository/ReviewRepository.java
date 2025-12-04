package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.Review;
import com.Gaming.Backend.entity.User;
import com.Gaming.Backend.entity.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    Page<Review> findByGame(Game game, Pageable pageable);
    
    Page<Review> findByGameIdOrderByCreatedAtDesc(Long gameId, Pageable pageable);
    
    Optional<Review> findByUserAndGame(User user, Game game);
    
    Boolean existsByUserAndGame(User user, Game game);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.game.id = :gameId")
    Double calculateAverageRating(@Param("gameId") Long gameId);
    
    Integer countByGameId(Long gameId);
}
