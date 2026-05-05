package com.cravely.controller;

import com.cravely.service.PaymentService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestParam Long orderId) {
        try {
            String razorpayOrderId = paymentService.createRazorpayOrder(orderId);
            return ResponseEntity.ok(Map.of("razorpayOrderId", razorpayOrderId));
        } catch (RazorpayException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        String razorpayOrderId = data.get("razorpayOrderId");
        String razorpayPaymentId = data.get("razorpayPaymentId");
        String razorpaySignature = data.get("razorpaySignature");

        boolean isValid = paymentService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);

        if (isValid) {
            return ResponseEntity.ok(Map.of("status", "success", "message", "Payment verified successfully"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("status", "failure", "message", "Payment verification failed"));
        }
    }
}
