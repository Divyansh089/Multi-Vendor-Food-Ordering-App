package com.cravely.service;

import com.cravely.dto.OrderRequest;
import com.cravely.dto.OrderResponse;
import com.cravely.exception.BadRequestException;
import com.cravely.exception.ResourceNotFoundException;
import com.cravely.model.*;
import com.cravely.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final VendorRepository vendorRepository;
    private final MenuRepository menuRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final DeliveryService deliveryService;
    private final PaymentService paymentService;

    @Transactional
    public OrderResponse placeOrder(Long customerId, OrderRequest request) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Vendor vendor = vendorRepository.findById(request.getVendorId())
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));

        if (!vendor.isOpen() || vendor.isBlocked()) {
            throw new BadRequestException("Vendor is currently not accepting orders");
        }

        Order order = Order.builder()
                .customer(customer)
                .vendor(vendor)
                .status(OrderStatus.PLACED)
                .deliveryAddress(request.getDeliveryAddress())
                .specialInstructions(request.getSpecialInstructions())
                .paymentStatus(PaymentStatus.PENDING)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
            MenuItem menuItem = menuRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found: " + itemReq.getMenuItemId()));

            if (!menuItem.getVendor().getId().equals(vendor.getId())) {
                throw new BadRequestException("Menu item does not belong to the selected vendor");
            }
            if (!menuItem.isAvailable()) {
                throw new BadRequestException("Menu item is currently unavailable: " + menuItem.getName());
            }

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .menuItem(menuItem)
                    .quantity(itemReq.getQuantity())
                    .price(menuItem.getPrice())
                    .build();

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(menuItem.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));
        }

        order.setOrderItems(orderItems);
        order.setTotalPrice(totalAmount);

        order = orderRepository.save(order);

        // Process Payment (Dummy Wallet Logic)
        PaymentMethod method = PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase());
        paymentService.processPayment(order, method, totalAmount);

        // Notify Vendor via WebSocket
        messagingTemplate.convertAndSend("/topic/orders/" + vendor.getId(), "New order received: " + order.getId());

        return mapToResponse(order);
    }

    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return mapToResponse(order);
    }

    @Transactional
    public OrderResponse updateOrderStatusByVendor(Long vendorId, Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getVendor().getId().equals(vendorId)) {
            throw new BadRequestException("Not authorized to update this order");
        }

        order.setStatus(newStatus);
        order = orderRepository.save(order);

        // If order is accepted, try to assign a delivery agent
        if (newStatus == OrderStatus.ACCEPTED) {
            deliveryService.assignDeliveryAgent(order);
        }

        // Notify Customer via WebSocket
        messagingTemplate.convertAndSend("/topic/customer/" + order.getCustomer().getId(), "Order status updated to: " + newStatus);

        return mapToResponse(order);
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setCustomerId(order.getCustomer().getId());
        response.setVendorId(order.getVendor().getId());
        if (order.getDeliveryAgent() != null) {
            response.setDeliveryAgentId(order.getDeliveryAgent().getId());
        }
        response.setStatus(order.getStatus().name());
        response.setTotalPrice(order.getTotalPrice());
        response.setDeliveryAddress(order.getDeliveryAddress());
        response.setPaymentStatus(order.getPaymentStatus().name());
        response.setCreatedAt(order.getCreatedAt());
        return response;
    }
}
