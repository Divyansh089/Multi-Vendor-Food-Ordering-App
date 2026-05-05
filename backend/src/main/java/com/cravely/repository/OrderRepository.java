package com.cravely.repository;

import com.cravely.model.Order;
import com.cravely.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByCustomerId(Long customerId);

    List<Order> findAllByVendorId(Long vendorId);

    List<Order> findAllByVendorIdAndStatus(Long vendorId, OrderStatus status);

    List<Order> findAllByDeliveryAgentId(Long deliveryAgentId);

    List<Order> findAllByDeliveryAgentIdAndStatus(Long deliveryAgentId, OrderStatus status);

    /** Find all active (non-terminal) orders for a vendor */
    @Query("SELECT o FROM Order o WHERE o.vendor.id = :vendorId AND o.status NOT IN ('DELIVERED', 'CANCELLED')")
    List<Order> findActiveOrdersByVendor(Long vendorId);

    /** Find all active orders for a delivery agent */
    @Query("SELECT o FROM Order o WHERE o.deliveryAgent.id = :agentId AND o.status NOT IN ('DELIVERED', 'CANCELLED')")
    List<Order> findActiveOrdersByAgent(Long agentId);
}
