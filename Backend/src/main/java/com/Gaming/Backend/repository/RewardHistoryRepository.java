package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.RewardHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardHistoryRepository extends JpaRepository<RewardHistory, Long> {
    
    Page<RewardHistory> findByUserId(Long userId, Pageable pageable);
    
    Page<RewardHistory> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
}
