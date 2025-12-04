package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.UserLibrary;
import com.Gaming.Backend.entity.User;
import com.Gaming.Backend.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLibraryRepository extends JpaRepository<UserLibrary, Long> {
    
    List<UserLibrary> findByUser(User user);
    
    List<UserLibrary> findByUserId(Long userId);
    
    Optional<UserLibrary> findByUserAndGame(User user, Game game);
    
    Boolean existsByUserAndGame(User user, Game game);
    
    Boolean existsByUserIdAndGameId(Long userId, Long gameId);
}
