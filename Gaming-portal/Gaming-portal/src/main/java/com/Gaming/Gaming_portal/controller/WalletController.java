package com.Gaming.Gaming_portal.controller;

import com.Gaming.Gaming_portal.dto.AddFundsRequest;
import com.Gaming.Gaming_portal.dto.WalletSummaryResponse;
import com.Gaming.Gaming_portal.dto.WalletTransactionResponse;
import com.Gaming.Gaming_portal.model.User;
import com.Gaming.Gaming_portal.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
@CrossOrigin
public class WalletController {

    private final WalletService walletService;

    @GetMapping
    public ResponseEntity<WalletSummaryResponse> getWallet(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(walletService.getSummary(user));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<WalletTransactionResponse>> getTransactions(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(walletService.getTransactions(user));
    }

    @PostMapping("/add-funds")
    public ResponseEntity<WalletSummaryResponse> addFunds(
            @AuthenticationPrincipal User user,
            @RequestBody AddFundsRequest request
    ) {
        return ResponseEntity.ok(walletService.addFunds(user, request));
    }
}



