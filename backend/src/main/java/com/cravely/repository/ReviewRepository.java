package com.cravely.repository;

import com.cravely.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByVendorId(Long vendorId);

    List<Review> findAllByDeliveryAgentId(Long agentId);

    List<Review> findAllByUserId(Long userId);

    Optional<Review> findByOrderId(Long orderId);

    /** Average overall rating for a vendor */
    @Query("SELECT AVG(r.overallRating) FROM Review r WHERE r.vendor.id = :vendorId")
    Double averageRatingByVendor(Long vendorId);

    /** Average overall rating for a delivery agent */
    @Query("SELECT AVG(r.overallRating) FROM Review r WHERE r.deliveryAgent.id = :agentId")
    Double averageRatingByAgent(Long agentId);
}
