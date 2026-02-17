package com.Gaming.Backend.dto.wallet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WalletResponse {
    
    private Long id;
    private Long userId;
    private Double balance;
    private String currency;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdated;
}
