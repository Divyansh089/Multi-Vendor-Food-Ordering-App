package com.cravely.controller;

import com.cravely.dto.OrderResponse;
import com.cravely.model.OrderStatus;
import com.cravely.model.User;
import com.cravely.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
public class DeliveryController {

    private final OrderService orderService;

    // Additional methods like GET /orders would go here, delegated to DeliveryService

    @PatchMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateDeliveryStatus(@AuthenticationPrincipal User user,
                                                              @PathVariable Long id,
                                                              @RequestBody Map<String, String> body) {
        // Simplified for this task: using same service logic
        OrderStatus status = OrderStatus.valueOf(body.get("status").toUpperCase());
        // For simplicity, passing user.getId() as vendorId to reuse method. In reality, would be a distinct delivery update logic.
        return ResponseEntity.ok(orderService.updateOrderStatusByVendor(user.getId(), id, status));
    }
}
