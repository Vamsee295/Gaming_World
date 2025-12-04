package com.Gaming.Gaming_portal.repository;

import com.Gaming.Gaming_portal.model.User;
import com.Gaming.Gaming_portal.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUser(User user);
}



