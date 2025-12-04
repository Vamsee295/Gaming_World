package com.Gaming.Gaming_portal.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(precision = 5, scale = 2)
    private BigDecimal discount; // 0-100 percent

    private String heroImageUrl;
    private String thumbnailUrl;
    private String trailerUrl;

    private String genre;
    private String tags; // comma-separated for simplicity

    private LocalDate releaseDate;

    @Column(columnDefinition = "TEXT")
    private String systemRequirements;

    private Double averageRating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;
}



