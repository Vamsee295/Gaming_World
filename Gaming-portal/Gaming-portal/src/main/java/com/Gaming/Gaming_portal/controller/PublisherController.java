package com.Gaming.Gaming_portal.controller;

import com.Gaming.Gaming_portal.model.Game;
import com.Gaming.Gaming_portal.model.Publisher;
import com.Gaming.Gaming_portal.repository.GameRepository;
import com.Gaming.Gaming_portal.repository.PublisherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/publishers")
@RequiredArgsConstructor
@CrossOrigin
public class PublisherController {

    private final PublisherRepository publisherRepository;
    private final GameRepository gameRepository;

    @GetMapping
    public ResponseEntity<List<Publisher>> getPublishers() {
        return ResponseEntity.ok(publisherRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Publisher> getPublisher(@PathVariable Long id) {
        return publisherRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/games")
    public ResponseEntity<List<Game>> getGamesByPublisher(@PathVariable Long id) {
        return publisherRepository.findById(id)
                .map(publisher -> {
                    List<Game> games = publisher.getGames();
                    return ResponseEntity.ok(games);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}



