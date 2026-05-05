package com.cravely.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class OrderResponse {
    private Long id;
    private Long customerId;
    private Long vendorId;
    private Long deliveryAgentId;
    private String status;
    private BigDecimal totalPrice;
    private String deliveryAddress;
    private String paymentStatus;
    private LocalDateTime createdAt;
}
