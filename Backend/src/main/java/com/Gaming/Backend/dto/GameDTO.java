package com.Gaming.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO for Game data transfer
 * Used for API responses to frontend
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDTO {
    
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Double discount;
    private Double effectivePrice; // Price after discount
    private String genre;
    private String publisher;
    private LocalDate releaseDate;
    private String imageUrl; // Primary image
    private String trailerLink;
    private Double rating;
    private Integer reviewCount;
    private Boolean isFreeToPlay;
    private Boolean featured;
    private Boolean editorPick;
    private String lastPlayedTime; // For "Continue Where You Left Off" section
    private Integer downloads;
    
    /**
     * Constructor for basic game info (without lastPlayedTime)
     */
    public GameDTO(Long id, String title, Double price, Double discount, String genre, 
                   String imageUrl, Double rating, Boolean isFreeToPlay) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.genre = genre;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.isFreeToPlay = isFreeToPlay;
        this.effectivePrice = calculateEffectivePrice();
    }
    
    /**
     * Calculate effective price after discount
     */
    private Double calculateEffectivePrice() {
        if (discount != null && discount > 0) {
            return price - (price * discount / 100);
        }
        return price;
    }
}
