package com.Gaming.Backend.service;

import com.Gaming.Backend.dto.GameDTO;
import com.Gaming.Backend.entity.Game;
import com.Gaming.Backend.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for generating personalized game recommendations
 * Implements 8 different recommendation algorithms for Steam-like homepage
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {
    
    private final GameRepository gameRepository;
    private final UserActivityService userActivityService;
    private final ModelMapper modelMapper;
    
    /**
     * 1. Continue Where You Left Off
     * Shows recently viewed/clicked games
     */
    public List<GameDTO> getContinueWhereYouLeftOff(Long userId) {
        log.debug("Getting continue playing games for user {}", userId);
        
        List<Long> recentGameIds = userActivityService.getRecentlyViewedGameIds(userId, 4);
        
        if (recentGameIds.isEmpty()) {
            return List.of();
        }
        
        List<Game> games = gameRepository.findByIdIn(recentGameIds);
        
        // Convert to DTOs and add "last played" time
       return games.stream()
                .map(this::convertToDTO)
                .peek(dto -> dto.setLastPlayedTime("Recently viewed"))
                .collect(Collectors.toList());
    }
    
    /**
     * 2. Recommended For You ⭐ (MOST IMPORTANT)
     * Based on user's preferred genres
     */
    public List<GameDTO> getRecommendedGames(Long userId) {
        log.debug("Getting recommended games for user {}", userId);
        
        List<String> preferredGenres = userActivityService.getUserPreferredGenres(userId);
        
        if (preferredGenres.isEmpty()) {
            // New user - show featured games
            return getFeaturedGames();
        }
        
        // Get top 3 preferred genres
        List<String> topGenres = preferredGenres.stream()
                .limit(3)
                .collect(Collectors.toList());
        
        Pageable pageable = PageRequest.of(0, 12);
        List<Game> games = gameRepository.findByActiveTrueAndGenreIn(topGenres, pageable);
        
        return games.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * 3. Because You Viewed [Game]
     * Contextual recommendations based on a specific game
     */
    public List<GameDTO> getBecauseYouViewedGames(Long userId, Long gameId) {
        log.debug("Getting 'because you viewed' games for user {} based on game {}", userId, gameId);
        
        // Find the game user viewed
        var gameOpt = gameRepository.findById(gameId);
        if (gameOpt.isEmpty()) {
            return List.of();
        }
        
        Game viewedGame = gameOpt.get();
        
        // Find similar games (same genre OR same publisher)
        List<Game> similarGames = new ArrayList<>();
        
        // Same genre games
        Pageable genrePageable = PageRequest.of(0, 4);
        List<Game> sameGenre = gameRepository.findByActiveTrueAndGenreIn(
                List.of(viewedGame.getGenre()), genrePageable);
        similarGames.addAll(sameGenre);
        
        // Same publisher games (if publisher exists)
        if (viewedGame.getPublisher() != null) {
            Pageable publisherPageable = PageRequest.of(0, 2);
            List<Game> samePublisher = gameRepository.findByActiveTrueAndPublisherId(
                    viewedGame.getPublisher().getId(), publisherPageable);
            similarGames.addAll(samePublisher);
        }
        
        // Remove the original game and limit to 6
        return similarGames.stream()
                .filter(g -> !g.getId().equals(gameId))
                .distinct()
                .limit(6)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * 4. Trending This Week
     * Games sorted by rating and downloads
     */
    public List<GameDTO> getTrendingGames() {
        log.debug("Getting trending games");
        
        Pageable pageable = PageRequest.of(0, 10);
        List<Game> games = gameRepository.findTrendingGames(pageable);
        
        return games.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * 5. Deals Just For You
     * Personalized deals based on user's preferred genres
     */
    public List<GameDTO> getPersonalizedDeals(Long userId) {
        log.debug("Getting personalized deals for user {}", userId);
        
        List<String> preferredGenres = userActivityService.getUserPreferredGenres(userId);
        
        if (preferredGenres.isEmpty()) {
            // New user - show all deals
            return getGenericDeals();
        }
        
        // Get deals in preferred genres
        List<String> topGenres = preferredGenres.stream()
                .limit(3)
                .collect(Collectors.toList());
        
        Pageable pageable = PageRequest.of(0, 8);
        List<Game> games = gameRepository.findByActiveTrueAndGenreIn(topGenres, pageable);
        
        // Filter only games with discount
        return games.stream()
                .filter(g -> g.getDiscount() != null && g.getDiscount() > 0)
                .map(this::convertToDTO)
                .limit(8)
                .collect(Collectors.toList());
    }
    
    /**
     * 6. Editor's Choice
     * Curated games marked by editors
     */
    public List<GameDTO> getEditorChoiceGames() {
        log.debug("Getting editor's choice games");
        
        Pageable pageable = PageRequest.of(0, 6);
        List<Game> games = gameRepository.findByActiveTrueAndEditorPickTrue(pageable);
        
        return games.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * 7. Recently Released
     * Games released in the last 3 months
     */
    public List<GameDTO> getRecentlyReleasedGames() {
        log.debug("Getting recently released games");
        
        LocalDate threeMonthsAgo = LocalDate.now().minus(3, ChronoUnit.MONTHS);
        Pageable pageable = PageRequest.of(0, 8);
        List<Game> games = gameRepository.findRecentlyReleased(threeMonthsAgo, pageable);
        
        return games.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * 8. Free to Play / Under $20
     * Budget-friendly games
     */
    public List<GameDTO> getBudgetGames() {
        log.debug("Getting budget games (free or under $20)");
        
        Pageable pageable = PageRequest.of(0, 10);
        List<Game> games = gameRepository.findBudgetGames(20.0, pageable);
        
        return games.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Helper methods
    
    /**
     * Get featured games for new users
     */
    private List<GameDTO> getFeaturedGames() {
        Pageable pageable = PageRequest.of(0, 12);
        List<Game> games = gameRepository.findFeaturedGames(pageable);
        
        return games.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get generic deals for new users
     */
    private List<GameDTO> getGenericDeals() {
        Pageable pageable = PageRequest.of(0, 8);
        List<Game> games = gameRepository.findByActiveTrueAndDiscountGreaterThan(0.0, pageable);
        
        return games.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert Game entity to GameDTO
     */
    private GameDTO convertToDTO(Game game) {
        GameDTO dto = modelMapper.map(game, GameDTO.class);
        
        // Set publisher name from publisher entity
        if (game.getPublisher() != null) {
            dto.setPublisher(game.getPublisher().getName());
        }
        
        // Set primary image from images collection
        if (game.getImages() != null && !game.getImages().isEmpty()) {
            dto.setImageUrl(game.getImages().iterator().next());
        }
        
        // Set rating
        dto.setRating(game.getAverageRating());
        dto.setReviewCount(game.getReviewCount());
        
        // Calculate effective price
        dto.setEffectivePrice(game.getDiscountedPrice());
        
        return dto;
    }
}
