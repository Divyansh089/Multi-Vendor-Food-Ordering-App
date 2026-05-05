package com.cravely.service;

import com.cravely.model.DeliveryAgent;
import com.cravely.model.Order;
import com.cravely.repository.DeliveryRepository;
import com.cravely.repository.OrderRepository;
import com.cravely.util.DistanceCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final OrderRepository orderRepository;
    private final DistanceCalculator distanceCalculator;
    private final SimpMessagingTemplate messagingTemplate;

    public void assignDeliveryAgent(Order order) {
        List<DeliveryAgent> availableAgents = deliveryRepository.findAllByIsAvailableTrue();

        if (availableAgents.isEmpty()) {
            // In a real system, we might queue this or retry later
            return;
        }

        double vendorLat = order.getVendor().getLatitude() != null ? order.getVendor().getLatitude() : 0.0;
        double vendorLng = order.getVendor().getLongitude() != null ? order.getVendor().getLongitude() : 0.0;

        DeliveryAgent nearestAgent = null;
        double minDistance = Double.MAX_VALUE;

        for (DeliveryAgent agent : availableAgents) {
            double agentLat = agent.getCurrentLatitude() != null ? agent.getCurrentLatitude() : 0.0;
            double agentLng = agent.getCurrentLongitude() != null ? agent.getCurrentLongitude() : 0.0;

            double distance = distanceCalculator.calculateDistanceKm(vendorLat, vendorLng, agentLat, agentLng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestAgent = agent;
            }
        }

        if (nearestAgent != null) {
            order.setDeliveryAgent(nearestAgent);
            nearestAgent.setAvailable(false); // Mark as busy
            deliveryRepository.save(nearestAgent);
            orderRepository.save(order);

            // Notify the agent
            messagingTemplate.convertAndSend("/topic/delivery/" + nearestAgent.getId(), "New delivery assigned: Order #" + order.getId());
        }
    }
}
