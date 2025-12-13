package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.Game;
import com.Gaming.Backend.entity.Publisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    
    Page<Game> findByActiveTrue(Pageable pageable);
    
    Page<Game> findByActiveTrueAndGenre(String genre, Pageable pageable);
    
    Page<Game> findByActiveTrueAndPublisher(Publisher publisher, Pageable pageable);
    
    @Query("SELECT g FROM Game g WHERE g.active = true AND " +
           "(LOWER(g.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(g.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Game> searchGames(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT g FROM Game g WHERE g.active = true AND g.discount > 0 ORDER BY g.discount DESC")
    List<Game> findGamesOnSale(Pageable pageable);
    
    @Query("SELECT g FROM Game g WHERE g.active = true ORDER BY g.downloads DESC")
    List<Game> findFeaturedGames(Pageable pageable);
    
    @Query("SELECT g FROM Game g WHERE g.active = true AND " +
           "(:genre IS NULL OR g.genre = :genre) AND " +
           "(:minPrice IS NULL OR g.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR g.price <= :maxPrice)")
    Page<Game> findWithFilters(@Param("genre") String genre, 
                                @Param("minPrice") Double minPrice,
                                @Param("maxPrice") Double maxPrice,
                                Pageable pageable);
    
    // Personalized recommendation methods
    
    /**
     * Find games by multiple genres (for personalized recommendations)
     */
    List<Game> findByActiveTrueAndGenreIn(List<String> genres, Pageable pageable);
    
    /**
     * Find games with discount greater than threshold
     */
    List<Game> findByActiveTrueAndDiscountGreaterThan(Double minDiscount, Pageable pageable);
    
    /**
     * Find editor's choice games
     */
    List<Game> findByActiveTrueAndEditorPickTrue(Pageable pageable);
    
    /**
     * Find recently released games
     */
    @Query("SELECT g FROM Game g WHERE g.active = true AND g.releaseDate >= :sinceDate ORDER BY g.releaseDate DESC")
    List<Game> findRecentlyReleased(@Param("sinceDate") java.time.LocalDate sinceDate, Pageable pageable);
    
    /**
     * Find free to play games or games under a certain price
     */
    @Query("SELECT g FROM Game g WHERE g.active = true AND (g.isFreeToPlay = true OR g.price <= :maxPrice)")
    List<Game> findBudgetGames(@Param("maxPrice") Double maxPrice, Pageable pageable);
    
    /**
     * Find games by publisher name (for "Because You Viewed" recommendations)
     */
    List<Game> findByActiveTrueAndPublisherId(Long publisherId, Pageable pageable);
    
    /**
     * Find trending games (high rating + recent activity)
     */
    @Query("SELECT g FROM Game g WHERE g.active = true ORDER BY g.averageRating DESC, g.downloads DESC")
    List<Game> findTrendingGames(Pageable pageable);
    
    /**
     * Find games by IDs (for fetching recently viewed games)
     */
    List<Game> findByIdIn(List<Long> ids);
}
