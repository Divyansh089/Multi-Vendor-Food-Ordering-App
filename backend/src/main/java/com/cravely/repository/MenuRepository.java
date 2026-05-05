package com.cravely.repository;

import com.cravely.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<MenuItem, Long> {

    List<MenuItem> findAllByVendorId(Long vendorId);

    List<MenuItem> findAllByVendorIdAndIsAvailableTrue(Long vendorId);

    List<MenuItem> findAllByVendorIdAndCategory(Long vendorId, String category);
}
