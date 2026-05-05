package com.cravely.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocket configuration using STOMP protocol over SockJS.
 *
 * Topics:
 * - /topic/orders/{vendorId}    → vendor receives new order events
 * - /topic/delivery/{agentId}  → agent receives delivery assignments
 * - /topic/customer/{userId}   → customer receives order status updates
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Enable simple in-memory broker for these destination prefixes
        registry.enableSimpleBroker("/topic", "/queue");
        // Prefix for messages from clients to server
        registry.setApplicationDestinationPrefixes("/app");
        // Prefix for user-specific messages
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // SockJS fallback endpoint — clients connect to /ws
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();

        // Native WebSocket endpoint (for clients that support it natively)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");
    }
}
