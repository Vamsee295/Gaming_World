package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.RedeemCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RedeemCodeRepository extends JpaRepository<RedeemCode, Long> {
    
    Optional<RedeemCode> findByCode(String code);
    
    Boolean existsByCode(String code);
}
