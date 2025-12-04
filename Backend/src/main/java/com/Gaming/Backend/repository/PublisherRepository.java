package com.Gaming.Backend.repository;

import com.Gaming.Backend.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    
    Optional<Publisher> findByName(String name);
    
    List<Publisher> findByActiveTrue();
}
