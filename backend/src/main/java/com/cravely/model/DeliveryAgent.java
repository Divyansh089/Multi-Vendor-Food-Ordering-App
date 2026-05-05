package com.cravely.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * DeliveryAgent entity — extends a DELIVERY-role User with location tracking and availability.
 */
@Entity
@Table(name = "delivery_agents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    /** Current live latitude — updated in real-time */
    private Double currentLatitude;

    /** Current live longitude — updated in real-time */
    private Double currentLongitude;

    /** Whether agent is free to accept new orders */
    @Column(nullable = false)
    private boolean isAvailable = true;

    /** Aggregate rating from customer reviews */
    private Double rating = 0.0;

    private int totalDeliveries = 0;

    private String vehicleType;

    private String vehicleNumber;
}
