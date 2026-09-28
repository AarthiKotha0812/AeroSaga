package com.aerosaga.backend.temporal;

import io.temporal.activity.ActivityInterface;
import io.temporal.activity.ActivityMethod;

@ActivityInterface
public interface DroneActivity {
    
    @ActivityMethod
    void takeoff(String droneId);
}
