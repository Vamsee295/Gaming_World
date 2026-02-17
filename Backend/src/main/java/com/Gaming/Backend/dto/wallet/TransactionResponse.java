package com.Gaming.Backend.dto.wallet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {
    
    private Long id;
    private String type; // CREDIT, DEBIT, PURCHASE, REFUND, REWARD
    private Double amount;
    private String description;
    private Double balanceAfter;
    private LocalDateTime createdAt;
    private String referenceId;
}
