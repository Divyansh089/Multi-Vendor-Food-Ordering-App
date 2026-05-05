package com.cravely.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private Long vendorId;
    private String deliveryAddress;
    private String specialInstructions;
    private String paymentMethod; // UPI, CARD, WALLET, COD
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long menuItemId;
        private int quantity;
    }
}
