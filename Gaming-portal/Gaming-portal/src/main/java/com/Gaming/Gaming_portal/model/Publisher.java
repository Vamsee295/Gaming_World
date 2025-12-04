package com.Gaming.Gaming_portal.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "publishers")
public class Publisher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 150)
    private String name;

    @Column(length = 500)
    private String description;

    private String website;
    private String logoUrl;

    @OneToMany(mappedBy = "publisher", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Game> games = new ArrayList<>();
}



