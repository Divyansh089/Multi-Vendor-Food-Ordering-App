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
@RequestMapping("/api/vendor")
@RequiredArgsConstructor
public class VendorController {

    private final OrderService orderService;

    @PatchMapping("/order/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(@AuthenticationPrincipal User user,
                                                           @PathVariable Long id,
                                                           @RequestBody Map<String, String> body) {
        OrderStatus status = OrderStatus.valueOf(body.get("status").toUpperCase());
        // For simplicity, assuming user ID = vendor ID for now
        return ResponseEntity.ok(orderService.updateOrderStatusByVendor(user.getId(), id, status));
    }
}
