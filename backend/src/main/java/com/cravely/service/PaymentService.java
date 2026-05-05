package com.cravely.service;

import com.cravely.model.*;
import com.cravely.repository.OrderRepository;
import com.cravely.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final RazorpayClient razorpayClient;

    public void processPayment(com.cravely.model.Order order, PaymentMethod method, BigDecimal amount) {
        if (method == PaymentMethod.RAZORPAY) {
            // For Razorpay, we don't mark as success immediately.
            // We just record that it's the intended method.
            log.info("Razorpay payment initiated for order: {}", order.getId());
            return;
        }

        Payment payment = Payment.builder()
                .order(order)
                .method(method)
                .amount(amount)
                .status(PaymentStatus.SUCCESS) // Dummy logic for others
                .transactionId(UUID.randomUUID().toString())
                .build();

        paymentRepository.save(payment);
        order.setPaymentStatus(PaymentStatus.SUCCESS);
    }

    @Transactional
    public String createRazorpayOrder(Long orderId) throws RazorpayException {
        com.cravely.model.Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        JSONObject orderRequest = new JSONObject();
        // Razorpay expects amount in paise (multiply by 100)
        orderRequest.put("amount", order.getTotalPrice().multiply(new BigDecimal(100)).intValue());
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt_" + orderId);

        Order razorpayOrder = razorpayClient.orders.create(orderRequest);
        String razorpayOrderId = razorpayOrder.get("id");

        // Save razorpay order id in payment record
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElse(Payment.builder()
                        .order(order)
                        .method(PaymentMethod.RAZORPAY)
                        .amount(order.getTotalPrice())
                        .status(PaymentStatus.PENDING)
                        .build());
        
        payment.setRazorpayOrderId(razorpayOrderId);
        paymentRepository.save(payment);

        return razorpayOrderId;
    }

    @Transactional
    public boolean verifyPayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature) {
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", razorpayOrderId);
            options.put("razorpay_payment_id", razorpayPaymentId);
            options.put("razorpay_signature", razorpaySignature);

            boolean isValid = Utils.verifyPaymentSignature(options, razorpayClient.getSecret());

            if (isValid) {
                Payment payment = paymentRepository.findByOrderId(Long.parseLong(razorpayOrderId.split("_")[1])) // Fallback if orderId mapping is direct
                        .orElse(null);
                
                // Better: Find by razorpayOrderId
                payment = paymentRepository.findAll().stream()
                        .filter(p -> razorpayOrderId.equals(p.getRazorpayOrderId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Payment record not found for razorpayOrderId: " + razorpayOrderId));

                payment.setStatus(PaymentStatus.SUCCESS);
                payment.setTransactionId(razorpayPaymentId);
                payment.setRazorpaySignature(razorpaySignature);
                paymentRepository.save(payment);

                com.cravely.model.Order order = payment.getOrder();
                order.setPaymentStatus(PaymentStatus.SUCCESS);
                orderRepository.save(order);
                
                return true;
            }
        } catch (Exception e) {
            log.error("Payment verification failed", e);
        }
        return false;
    }
}
