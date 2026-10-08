package com.aerosaga.backend.temporal;

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
    }

    @Override
    public void returnToBase(String droneId) {
        System.out.println("Drone " + droneId + " is returning to base...");
        sleep();
        System.out.println("Drone " + droneId + " returned to base.");
    }

    private void sleep() {
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}