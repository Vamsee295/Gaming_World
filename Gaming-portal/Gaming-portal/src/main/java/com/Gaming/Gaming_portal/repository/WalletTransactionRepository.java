package com.Gaming.Gaming_portal.repository;

import com.Gaming.Gaming_portal.model.Wallet;
import com.Gaming.Gaming_portal.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByWalletOrderByCreatedAtDesc(Wallet wallet);
}



