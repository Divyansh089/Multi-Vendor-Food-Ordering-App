package com.cravely.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * MenuItem entity — a dish or product offered by a Vendor.
 */
@Entity
@Table(name = "menu_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    private String imageUrl;

    private String category;

    @Column(nullable = false)
    private boolean isAvailable = true;

    private boolean isVeg = false;
}
