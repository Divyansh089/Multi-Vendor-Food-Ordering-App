package com.cravely.repository;

import com.cravely.model.DeliveryAgent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<DeliveryAgent, Long> {

    Optional<DeliveryAgent> findByUserId(Long userId);

    List<DeliveryAgent> findAllByIsAvailableTrue();

    boolean existsByUserId(Long userId);
}
