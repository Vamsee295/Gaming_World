package com.Gaming.Gaming_portal.repository;

import com.Gaming.Gaming_portal.model.Game;
import com.Gaming.Gaming_portal.model.User;
import com.Gaming.Gaming_portal.model.UserGameOwnership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserGameOwnershipRepository extends JpaRepository<UserGameOwnership, Long> {
    List<UserGameOwnership> findByUser(User user);
    Optional<UserGameOwnership> findByUserAndGame(User user, Game game);
    boolean existsByUserAndGame(User user, Game game);
}



