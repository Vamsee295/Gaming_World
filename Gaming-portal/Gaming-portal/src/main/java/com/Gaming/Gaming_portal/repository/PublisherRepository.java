package com.Gaming.Gaming_portal.repository;

import com.Gaming.Gaming_portal.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    Optional<Publisher> findByNameIgnoreCase(String name);
}



