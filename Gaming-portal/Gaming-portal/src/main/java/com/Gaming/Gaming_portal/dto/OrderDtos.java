package com.Gaming.Gaming_portal.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PurchaseRequest {
    private List<Long> gameIds;
    private String paymentMethod; // e.g., CARD, UPI, WALLET, MOCK
}

@Data
public class PurchaseResponse {
    private Long orderId;
    private BigDecimal totalAmount;
    private String status;
    private List<Long> gameIds;
}



