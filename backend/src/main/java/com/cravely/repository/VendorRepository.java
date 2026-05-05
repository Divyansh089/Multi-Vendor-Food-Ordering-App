package com.cravely.repository;

import com.cravely.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

    Optional<Vendor> findByOwnerId(Long ownerId);

    List<Vendor> findAllByIsOpenTrue();

    List<Vendor> findAllByBlockedFalse();

    List<Vendor> findAllByIsOpenTrueAndBlockedFalse();

    /** Find top vendors by rating for discover feed */
    @Query("SELECT v FROM Vendor v WHERE v.blocked = false ORDER BY v.rating DESC")
    List<Vendor> findTopRatedVendors();

    boolean existsByOwnerId(Long ownerId);
}
