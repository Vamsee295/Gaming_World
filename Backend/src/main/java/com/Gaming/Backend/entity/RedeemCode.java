package com.Gaming.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "redeem_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RedeemCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CodeType type;

    private Double value;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(nullable = false)
    private Boolean isUsed = false;

    @ManyToOne
    @JoinColumn(name = "used_by")
    private User usedBy;

    private LocalDateTime usedAt;

    private LocalDateTime expiryDate;

    @Column(length = 500)
    private String description;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum CodeType {
        GAME, WALLET, REWARD_POINTS, GIFT_CARD
    }

    public boolean isValid() {
        return !isUsed && (expiryDate == null || expiryDate.isAfter(LocalDateTime.now()));
    }
}
