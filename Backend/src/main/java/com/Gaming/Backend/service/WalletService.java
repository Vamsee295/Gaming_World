package com.Gaming.Backend.service;

import com.Gaming.Backend.dto.wallet.AddFundsRequest;
import com.Gaming.Backend.dto.wallet.TransactionResponse;
import com.Gaming.Backend.dto.wallet.WalletResponse;
import com.Gaming.Backend.entity.User;
import com.Gaming.Backend.entity.Wallet;
import com.Gaming.Backend.entity.WalletTransaction;
import com.Gaming.Backend.exception.BadRequestException;
import com.Gaming.Backend.exception.ResourceNotFoundException;
import com.Gaming.Backend.repository.UserRepository;
import com.Gaming.Backend.repository.WalletRepository;
import com.Gaming.Backend.repository.WalletTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;
    private final WalletTransactionRepository walletTransactionRepository;
    private final UserRepository userRepository;

    /**
     * Get wallet by user ID. Creates wallet if it doesn't exist.
     */
    @Transactional
    public WalletResponse getWalletByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Wallet wallet = walletRepository.findByUserId(userId)
                .orElseGet(() -> createWalletForUser(user));

        return mapToWalletResponse(wallet);
    }

    /**
     * Add funds to user's wallet
     */
    @Transactional
    public WalletResponse addFunds(Long userId, AddFundsRequest request) {
        if (request.getAmount() == null || request.getAmount() <= 0) {
            throw new BadRequestException("Amount must be greater than 0");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Wallet wallet = walletRepository.findByUserId(userId)
                .orElseGet(() -> createWalletForUser(user));

        // Update balance
        wallet.setBalance(wallet.getBalance() + request.getAmount());
        wallet.setLastUpdated(LocalDateTime.now());
        wallet = walletRepository.save(wallet);

        // Record transaction
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setType(WalletTransaction.TransactionType.CREDIT);
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription() != null 
            ? request.getDescription() 
            : "Added Funds via " + (request.getPaymentMethod() != null ? request.getPaymentMethod() : "Wallet"));
        transaction.setBalanceAfter(wallet.getBalance());
        walletTransactionRepository.save(transaction);

        return mapToWalletResponse(wallet);
    }

    /**
     * Deduct funds from user's wallet
     */
    @Transactional
    public WalletResponse deductFunds(Long userId, Double amount, String description) {
        if (amount == null || amount <= 0) {
            throw new BadRequestException("Amount must be greater than 0");
        }

        Wallet wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));

        if (wallet.getBalance() < amount) {
            throw new BadRequestException("Insufficient balance");
        }

        // Update balance
        wallet.setBalance(wallet.getBalance() - amount);
        wallet.setLastUpdated(LocalDateTime.now());
        wallet = walletRepository.save(wallet);

        // Record transaction
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setType(WalletTransaction.TransactionType.DEBIT);
        transaction.setAmount(amount);
        transaction.setDescription(description != null ? description : "Deducted from wallet");
        transaction.setBalanceAfter(wallet.getBalance());
        walletTransactionRepository.save(transaction);

        return mapToWalletResponse(wallet);
    }

    /**
     * Get transaction history for user
     */
    public List<TransactionResponse> getTransactionHistory(Long userId) {
        Wallet wallet = walletRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));

        List<WalletTransaction> transactions = walletTransactionRepository.findByWalletIdOrderByCreatedAtDesc(wallet.getId());
        
        return transactions.stream()
                .map(this::mapToTransactionResponse)
                .collect(Collectors.toList());
    }

    /**
     * Create wallet for user
     */
    private Wallet createWalletForUser(User user) {
        Wallet wallet = new Wallet();
        wallet.setUser(user);
        wallet.setBalance(0.0);
        wallet.setCurrency("INR"); // Default to INR
        return walletRepository.save(wallet);
    }

    /**
     * Map Wallet entity to WalletResponse DTO
     */
    private WalletResponse mapToWalletResponse(Wallet wallet) {
        WalletResponse response = new WalletResponse();
        response.setId(wallet.getId());
        response.setUserId(wallet.getUser().getId());
        response.setBalance(wallet.getBalance());
        response.setCurrency(wallet.getCurrency());
        response.setCreatedAt(wallet.getCreatedAt());
        response.setLastUpdated(wallet.getLastUpdated());
        return response;
    }

    /**
     * Map WalletTransaction entity to TransactionResponse DTO
     */
    private TransactionResponse mapToTransactionResponse(WalletTransaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        response.setType(transaction.getType().name());
        response.setAmount(transaction.getAmount());
        response.setDescription(transaction.getDescription());
        response.setBalanceAfter(transaction.getBalanceAfter());
        response.setCreatedAt(transaction.getCreatedAt());
        return response;
    }
}
