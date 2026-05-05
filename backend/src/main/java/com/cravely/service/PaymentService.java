package com.cravely.service;

import com.cravely.model.Order;
import com.cravely.model.Payment;
import com.cravely.model.PaymentMethod;
import com.cravely.model.PaymentStatus;
import com.cravely.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public void processPayment(Order order, PaymentMethod method, BigDecimal amount) {
        Payment payment = Payment.builder()
                .order(order)
                .method(method)
                .amount(amount)
                .status(PaymentStatus.SUCCESS) // Dummy logic: assume always success
                .transactionId(UUID.randomUUID().toString())
                .build();

        paymentRepository.save(payment);

        order.setPaymentStatus(PaymentStatus.SUCCESS);
    }
}
