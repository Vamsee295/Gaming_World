package com.Gaming.Backend.dto.wallet;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddFundsRequest {
    
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Amount must be greater than 0")
    private Double amount;
    
    private String description;
    
    private String paymentMethod; // e.g., "UPI", "CARD", "WALLET_CODE"
    
    private String referenceId; // Payment reference/transaction ID
}
