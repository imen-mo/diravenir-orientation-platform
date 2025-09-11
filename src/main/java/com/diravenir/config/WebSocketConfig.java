package com.diravenir.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
        
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Configuration des destinations de messages
        registry.enableSimpleBroker("/topic", "/queue");
        
        // Configuration des préfixes pour les messages envoyés par les clients
        registry.setApplicationDestinationPrefixes("/app");
        
        // Configuration des préfixes pour les messages envoyés aux utilisateurs spécifiques
        registry.setUserDestinationPrefix("/user");
    }
}
