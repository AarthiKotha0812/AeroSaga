package com.aerosaga.backend.temporal;

import io.temporal.activity.ActivityOptions;
import io.temporal.workflow.Workflow;

import java.time.Duration;

public class DroneWorkflowImpl implements DroneWorkflow {

    private final DroneActivity activities =
            Workflow.newActivityStub(
                    DroneActivity.class,
                    ActivityOptions.newBuilder()
                            .setStartToCloseTimeout(Duration.ofSeconds(10))
                            .build()
            );

    @Override
    public void executeMission(String droneId) {

        System.out.println("Starting mission for drone: " + droneId);

        activities.takeoff(droneId);

        activities.navigate(droneId);

        activities.dropPackage(droneId);

        activities.returnToBase(droneId);

        System.out.println("Mission completed for drone: " + droneId);
    }
}