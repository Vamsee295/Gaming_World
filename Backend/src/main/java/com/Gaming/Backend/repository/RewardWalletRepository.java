package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.RewardWallet;
import com.Gaming.Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RewardWalletRepository extends JpaRepository<RewardWallet, Long> {
    
    Optional<RewardWallet> findByUser(User user);
    
    Optional<RewardWallet> findByUserId(Long userId);
}
