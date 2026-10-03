
package com.aerosaga.backend.temporal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.temporal.activity.Activity;


public class DroneActivityImpl implements DroneActivity {

    private static final Logger logger =
            LoggerFactory.getLogger(DroneActivityImpl.class);

    @Override
    public int checkBattery(String droneId) {
        int batteryLevel = 85;

        logger.info("{} battery level: {}%",
                droneId, batteryLevel);

        return batteryLevel;
    }

    @Override
    public void takeoff(String droneId) {
        logger.info("{} is taking off", droneId);
        simulateDelay();
    }

    @Override
    public void travelToDestination(String droneId) {
        logger.info("{} is travelling to destination", droneId);
        simulateDelay();
    }

    @Override
    public void deliverPackage(String droneId) {

        logger.info("{} is delivering the package", droneId);

        simulateDelay();

        if ("drone-fail".equals(droneId)) {
            logger.error("{} delivery failed!", droneId);

            throw new RuntimeException(
                    "Simulated delivery failure for " + droneId
            );
        }

        logger.info("{} package delivered successfully", droneId);
    }

    @Override
    public void returnToBase(String droneId) {
        logger.info("{} is returning to base", droneId);
        simulateDelay();
        logger.info("{} has returned to base", droneId);
    }

    private void simulateDelay() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw Activity.wrap(e);
        }
    }
}