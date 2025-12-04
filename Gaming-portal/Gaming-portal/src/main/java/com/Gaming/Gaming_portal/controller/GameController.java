package com.Gaming.Gaming_portal.controller;

import com.Gaming.Gaming_portal.model.Game;
import com.Gaming.Gaming_portal.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
@CrossOrigin
public class GameController {

    private final GameRepository gameRepository;

    @GetMapping
    public ResponseEntity<List<Game>> getGames(
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String search
    ) {
        List<Game> games;
        if (search != null && !search.isBlank()) {
            games = gameRepository.findByTitleContainingIgnoreCase(search);
        } else if (genre != null && !genre.isBlank()) {
            games = gameRepository.findByGenreIgnoreCase(genre);
        } else if (minPrice != null && maxPrice != null) {
            games = gameRepository.findByPriceBetween(minPrice, maxPrice);
        } else {
            games = gameRepository.findAll();
        }
        return ResponseEntity.ok(games);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGame(@PathVariable Long id) {
        return gameRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}



