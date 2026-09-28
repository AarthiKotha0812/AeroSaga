package com.aerosaga.backend.temporal;

public class DroneActivityImpl implements DroneActivity {
    
    @Override
    public void takeoff(String droneId) {
        System.out.println("Drone " + droneId + " is taking off...");
        try {
            Thread.sleep(2000); // Simulate takeoff time
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("Drone " + droneId + " has taken off successfully.");
    }
}
