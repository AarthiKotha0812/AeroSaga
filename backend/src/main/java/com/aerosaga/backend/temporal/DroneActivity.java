
package com.aerosaga.backend.temporal;

import io.temporal.activity.ActivityInterface;
import io.temporal.activity.ActivityMethod;

@ActivityInterface
public interface DroneActivity {

    @ActivityMethod
    int checkBattery(String droneId);

    @ActivityMethod
    void takeoff(String droneId);

    @ActivityMethod
    void travelToDestination(String droneId);

    @ActivityMethod
    void deliverPackage(String droneId);

    @ActivityMethod
    void returnToBase(String droneId);
}