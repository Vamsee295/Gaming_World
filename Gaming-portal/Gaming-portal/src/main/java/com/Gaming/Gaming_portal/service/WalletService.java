package com.Gaming.Gaming_portal.service;

import com.Gaming.Gaming_portal.dto.AddFundsRequest;
import com.Gaming.Gaming_portal.dto.WalletSummaryResponse;
import com.Gaming.Gaming_portal.dto.WalletTransactionResponse;
import com.Gaming.Gaming_portal.model.User;
import com.Gaming.Gaming_portal.model.Wallet;
import com.Gaming.Gaming_portal.model.WalletTransaction;
import com.Gaming.Gaming_portal.repository.WalletRepository;
import com.Gaming.Gaming_portal.repository.WalletTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;
    private final WalletTransactionRepository transactionRepository;

    @Transactional
    public Wallet getOrCreateWallet(User user) {
        return walletRepository.findByUser(user)
                .orElseGet(() -> {
                    Wallet wallet = Wallet.builder()
                            .user(user)
                            .balance(BigDecimal.ZERO)
                            .build();
                    return walletRepository.save(wallet);
                });
    }

    public WalletSummaryResponse getSummary(User user) {
        Wallet wallet = getOrCreateWallet(user);
        WalletSummaryResponse resp = new WalletSummaryResponse();
        resp.setBalance(wallet.getBalance());
        return resp;
    }

    public List<WalletTransactionResponse> getTransactions(User user) {
        Wallet wallet = getOrCreateWallet(user);
        List<WalletTransaction> txs = transactionRepository.findByWalletOrderByCreatedAtDesc(wallet);
        return txs.stream().map(tx -> {
            WalletTransactionResponse r = new WalletTransactionResponse();
            r.setId(tx.getId());
            r.setAmount(tx.getAmount());
            r.setCredit(tx.getCredit());
            r.setCreatedAt(tx.getCreatedAt());
            r.setDescription(tx.getDescription());
            return r;
        }).toList();
    }

    @Transactional
    public WalletSummaryResponse addFunds(User user, AddFundsRequest request) {
        if (request.getAmount() == null || request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        Wallet wallet = getOrCreateWallet(user);
        wallet.setBalance(wallet.getBalance().add(request.getAmount()));
        walletRepository.save(wallet);

        WalletTransaction tx = WalletTransaction.builder()
                .wallet(wallet)
                .amount(request.getAmount())
                .credit(true)
                .description(request.getDescription() != null ? request.getDescription() : "Add funds (mock)")
                .build();
        transactionRepository.save(tx);

        WalletSummaryResponse resp = new WalletSummaryResponse();
        resp.setBalance(wallet.getBalance());
        return resp;
    }
}



