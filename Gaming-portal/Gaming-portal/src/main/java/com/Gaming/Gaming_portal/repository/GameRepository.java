package com.Gaming.Gaming_portal.repository;

import com.Gaming.Gaming_portal.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByGenreIgnoreCase(String genre);
    List<Game> findByPriceBetween(BigDecimal min, BigDecimal max);
    List<Game> findByTitleContainingIgnoreCase(String title);
}



