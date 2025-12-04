package com.Gaming.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "coupons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DiscountType discountType;

    @Column(nullable = false)
    private Double value;

    private LocalDateTime expiryDate;

    private Double minPurchase;

    @Column(nullable = false)
    private Integer maxUsage = 1;

    @Column(nullable = false)
    private Integer currentUsage = 0;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(length = 500)
    private String description;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum DiscountType {
        PERCENTAGE, FIXED
    }

    public boolean isValid() {
        return isActive && 
               (expiryDate == null || expiryDate.isAfter(LocalDateTime.now())) &&
               (maxUsage == 0 || currentUsage < maxUsage);
    }
}
