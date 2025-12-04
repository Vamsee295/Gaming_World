package com.Gaming.Backend.dto.game;

import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class GameDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Double discount;
    private Double discountedPrice;
    private String genre;
    private Set<String> tags;
    private String publisherName;
    private LocalDate releaseDate;
    private Set<String> images;
    private String trailerLink;
    private Double averageRating;
    private Integer reviewCount;
    private Integer downloads;
}
