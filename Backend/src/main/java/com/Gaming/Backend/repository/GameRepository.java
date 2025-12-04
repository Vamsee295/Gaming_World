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
}
