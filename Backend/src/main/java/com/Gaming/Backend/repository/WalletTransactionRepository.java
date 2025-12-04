package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.WalletTransaction;
import com.Gaming.Backend.entity.Wallet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    
    Page<WalletTransaction> findByWallet(Wallet wallet, Pageable pageable);
    
    Page<WalletTransaction> findByWalletIdOrderByCreatedAtDesc(Long walletId, Pageable pageable);
}
