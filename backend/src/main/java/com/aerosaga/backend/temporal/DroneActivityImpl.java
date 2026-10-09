
package com.aerosaga.backend.temporal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.temporal.activity.Activity;


public class DroneActivityImpl implements DroneActivity {

    @Override
    public void takeoff(String droneId) {
        System.out.println("Drone " + droneId + " is taking off...");
        sleep();
        System.out.println("Drone " + droneId + " has taken off successfully.");
    }

    @Override
    public void navigate(String droneId) {
        System.out.println("Drone " + droneId + " is navigating...");
        sleep();
        System.out.println("Drone " + droneId + " reached destination.");
    }

    @Override
    public void dropPackage(String droneId) {
        System.out.println("Drone " + droneId + " is dropping the package...");
        sleep();
        System.out.println("Drone " + droneId + " dropped the package successfully.");

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
        System.out.println("Drone " + droneId + " is returning to base...");
        sleep();
        System.out.println("Drone " + droneId + " returned to base.");
    }

    private void sleep() {

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