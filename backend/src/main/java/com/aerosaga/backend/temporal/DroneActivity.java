package com.aerosaga.backend.temporal;

import io.temporal.activity.ActivityInterface;
import io.temporal.activity.ActivityMethod;

@ActivityInterface
public interface DroneActivity {

    @ActivityMethod
    void takeoff(String droneId);

    @ActivityMethod
    void navigate(String droneId);

    @ActivityMethod
    void dropPackage(String droneId);

    @ActivityMethod
    void returnToBase(String droneId);
}