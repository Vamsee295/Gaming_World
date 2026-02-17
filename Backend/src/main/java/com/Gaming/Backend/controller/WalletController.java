package com.Gaming.Backend.controller;

import com.Gaming.Backend.dto.ApiResponse;
import com.Gaming.Backend.dto.wallet.AddFundsRequest;
import com.Gaming.Backend.dto.wallet.TransactionResponse;
import com.Gaming.Backend.dto.wallet.WalletResponse;
import com.Gaming.Backend.security.UserPrincipal;
import com.Gaming.Backend.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
@Tag(name = "Wallet", description = "Wallet and transaction management endpoints")
@SecurityRequirement(name = "bearerAuth")
public class WalletController {

    private final WalletService walletService;

    @GetMapping("/balance")
    @Operation(summary = "Get wallet balance", description = "Get current wallet balance for authenticated user")
    public ResponseEntity<WalletResponse> getBalance(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        WalletResponse wallet = walletService.getWalletByUserId(userPrincipal.getId());
        return ResponseEntity.ok(wallet);
    }

    @PostMapping("/add-funds")
    @Operation(summary = "Add funds to wallet", description = "Add money to user's wallet")
    public ResponseEntity<WalletResponse> addFunds(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody AddFundsRequest request) {
        WalletResponse wallet = walletService.addFunds(userPrincipal.getId(), request);
        return ResponseEntity.ok(wallet);
    }

    @GetMapping("/transactions")
    @Operation(summary = "Get transaction history", description = "Get all wallet transactions for authenticated user")
    public ResponseEntity<List<TransactionResponse>> getTransactions(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<TransactionResponse> transactions = walletService.getTransactionHistory(userPrincipal.getId());
        return ResponseEntity.ok(transactions);
    }

    @PostMapping("/deduct-funds")
    @Operation(summary = "Deduct funds from wallet", description = "Deduct money from user's wallet (for purchases)")
    public ResponseEntity<WalletResponse> deductFunds(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam Double amount,
            @RequestParam(required = false) String description) {
        WalletResponse wallet = walletService.deductFunds(userPrincipal.getId(), amount, description);
        return ResponseEntity.ok(wallet);
    }
}
