package com.aerosaga.backend.service;

import com.aerosaga.backend.model.TelemetryData;
import com.aerosaga.backend.websocket.TelemetryWebSocketHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TelemetrySimulatorService {

    private final TelemetryWebSocketHandler webSocketHandler;
    private final ObjectMapper objectMapper;

    private double currentLat = 37.7749;
    private double currentLon = -122.4194;
    private double currentAlt = 150.0;
    
    private double targetLat = 37.8044; // Target: San Francisco, roughly North
    private double targetLon = -122.2712; // Target: Oakland, roughly East

    public TelemetrySimulatorService(TelemetryWebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
        this.objectMapper = new ObjectMapper();
    }

    @Scheduled(fixedRate = 1000)
    public void simulateTelemetry() {
        // Move towards target
        currentLat += (targetLat - currentLat) * 0.001;
        currentLon += (targetLon - currentLon) * 0.001;
        
        // Randomize speed/altitude slightly for realism
        currentAlt += (Math.random() - 0.5) * 2;
        double speed = 42 + (Math.random() - 0.5) * 5;
        double heading = 45 + (Math.random() - 0.5) * 5;
        
        TelemetryData data = new TelemetryData(
            "DRONE-01",
            currentLat,
            currentLon,
            currentAlt,
            speed,
            heading
        );
        
        try {
            String json = objectMapper.writeValueAsString(data);
            webSocketHandler.broadcast(json);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
