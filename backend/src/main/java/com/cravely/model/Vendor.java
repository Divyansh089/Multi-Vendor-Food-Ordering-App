package com.cravely.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Vendor entity — a restaurant/shop registered on the Cravely platform.
 * Each vendor is linked to a User with VENDOR role.
 */
@Entity
@Table(name = "vendors")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The user account that owns this vendor profile */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false, unique = true)
    private User owner;

    @Column(nullable = false)
    private String name;

    private String description;
    private String imageUrl;
    private String cuisine;
    private String eta;
    private Double surge;
    private String priceLevel;

    @ElementCollection
    private List<String> tags;

    /** Latitude of vendor location */
    private Double latitude;

    /** Longitude of vendor location */
    private Double longitude;

    private String address;

    /** Whether the vendor is currently accepting orders */
    @Column(nullable = false)
    private boolean isOpen = false;

    /** Aggregate rating computed from reviews */
    @Column(precision = 3)
    private Double rating = 0.0;

    private int totalReviews = 0;

    /** Admin can block a vendor from the platform */
    private boolean blocked = false;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
