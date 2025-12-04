package com.Gaming.Gaming_portal.controller;

import com.Gaming.Gaming_portal.model.Game;
import com.Gaming.Gaming_portal.model.User;
import com.Gaming.Gaming_portal.model.UserGameOwnership;
import com.Gaming.Gaming_portal.repository.GameRepository;
import com.Gaming.Gaming_portal.repository.UserGameOwnershipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/library")
@RequiredArgsConstructor
@CrossOrigin
public class LibraryController {

    private final UserGameOwnershipRepository ownershipRepository;
    private final GameRepository gameRepository;

    @GetMapping("/my")
    public ResponseEntity<List<Game>> getMyLibrary(@AuthenticationPrincipal User user) {
        List<UserGameOwnership> owned = ownershipRepository.findByUser(user);
        List<Game> games = owned.stream().map(UserGameOwnership::getGame).collect(Collectors.toList());
        return ResponseEntity.ok(games);
    }

    @GetMapping("/owns/{gameId}")
    public ResponseEntity<Boolean> ownsGame(
            @AuthenticationPrincipal User user,
            @PathVariable Long gameId
    ) {
        return gameRepository.findById(gameId)
                .map(game -> ResponseEntity.ok(ownershipRepository.existsByUserAndGame(user, game)))
                .orElse(ResponseEntity.ok(false));
    }
}



