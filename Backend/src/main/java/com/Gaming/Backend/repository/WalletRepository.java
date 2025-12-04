package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.Wallet;
import com.Gaming.Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    
    Optional<Wallet> findByUser(User user);
    
    Optional<Wallet> findByUserId(Long userId);
}
