package com.Gaming.Gaming_portal.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
public class WalletSummaryResponse {
    private BigDecimal balance;
}

@Data
public class WalletTransactionResponse {
    private Long id;
    private BigDecimal amount;
    private Boolean credit;
    private Instant createdAt;
    private String description;
}

@Data
public class AddFundsRequest {
    private BigDecimal amount;
    private String description;
}



