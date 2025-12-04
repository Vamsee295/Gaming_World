package com.Gaming.Backend.controller;

import com.Gaming.Backend.dto.game.GameDTO;
import com.Gaming.Backend.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
@Tag(name = "Games", description = "Game catalog and store endpoints")
public class GameController {

    private final GameService gameService;

    @GetMapping
    @Operation(summary = "Get all games", description = "Get paginated list of all active games")
    public ResponseEntity<Page<GameDTO>> getAllGames(
            @Parameter(description = "Page number (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "12") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy
    )  {
        Page<GameDTO> games = gameService.getAllGames(page, size, sortBy);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get game by ID", description = "Get detailed game information")
    public ResponseEntity<GameDTO> getGameById(
            @Parameter(description = "Game ID") @PathVariable Long id
    ) {
        GameDTO game = gameService.getGameById(id);
        return ResponseEntity.ok(game);
    }

    @GetMapping("/search")
    @Operation(summary = "Search games", description = "Search games by title or description")
    public ResponseEntity<Page<GameDTO>> searchGames(
            @Parameter(description = "Search keyword") @RequestParam String keyword,
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "12") int size
    ) {
        Page<GameDTO> games = gameService.searchGames(keyword, page, size);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/filter")
    @Operation(summary = "Filter games", description = "Filter games by genre and price range")
    public ResponseEntity<Page<GameDTO>> filterGames(
            @Parameter(description = "Genre filter") @RequestParam(required = false) String genre,
            @Parameter(description = "Minimum price") @RequestParam(required = false) Double minPrice,
            @Parameter(description = "Maximum price") @RequestParam(required = false) Double maxPrice,
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "12") int size
    ) {
        Page<GameDTO> games = gameService.filterGames(genre, minPrice, maxPrice, page, size);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/featured")
    @Operation(summary = "Get featured games", description = "Get top featured games by downloads")
    public ResponseEntity<List<GameDTO>> getFeaturedGames(
            @Parameter(description = "Number of games") @RequestParam(defaultValue = "10") int limit
    ) {
        List<GameDTO> games = gameService.getFeaturedGames(limit);
        return ResponseEntity.ok(games);
    }

    @GetMapping("/on-sale")
    @Operation(summary = "Get games on sale", description = "Get games with active discounts")
    public ResponseEntity<List<GameDTO>> getGamesOnSale(
            @Parameter(description = "Number of games") @RequestParam(defaultValue = "10") int limit
    ) {
        List<GameDTO> games = gameService.getGamesOnSale(limit);
        return ResponseEntity.ok(games);
    }
}
