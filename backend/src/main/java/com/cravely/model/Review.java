package com.cravely.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Review entity — customers can rate vendors and delivery agents.
 * Supports weighted composite rating: (food + delivery + time) / 3
 */
@Entity
@Table(name = "reviews")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_agent_id")
    private DeliveryAgent deliveryAgent;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", unique = true)
    private Order order;

    /** Food quality rating (1-5) */
    private int foodRating;

    /** Delivery speed rating (1-5) */
    private int deliveryRating;

    /** Overall time rating (1-5) */
    private int timeRating;

    /**
     * Computed weighted rating: (foodRating + deliveryRating + timeRating) / 3.0
     * Stored for quick aggregation.
     */
    private Double overallRating;

    @Column(length = 1000)
    private String comment;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    @PreUpdate
    protected void computeRating() {
        this.overallRating = (foodRating + deliveryRating + timeRating) / 3.0;
    }
}
