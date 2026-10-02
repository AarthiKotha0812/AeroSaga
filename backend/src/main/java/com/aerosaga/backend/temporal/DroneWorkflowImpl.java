
package com.aerosaga.backend.temporal;

import java.time.Duration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.temporal.activity.ActivityOptions;
import io.temporal.workflow.Workflow;

public class DroneWorkflowImpl implements DroneWorkflow {

    private static final Logger logger =
            LoggerFactory.getLogger(DroneWorkflowImpl.class);

    private final DroneActivity activity =
            Workflow.newActivityStub(
                    DroneActivity.class,
                    ActivityOptions.newBuilder()
                            .setStartToCloseTimeout(
                                    Duration.ofSeconds(30))
                            .build()
            );

    @Override
    public void executeMission(String droneId) {

        logger.info("Mission started for {}", droneId);

        int battery = activity.checkBattery(droneId);

        if (battery < 30) {
            throw new IllegalStateException(
                    "Battery too low for drone: " + droneId);
        }

        activity.takeoff(droneId);

        activity.travelToDestination(droneId);

        activity.deliverPackage(droneId);

        activity.returnToBase(droneId);

        logger.info("Mission completed for {}", droneId);
    }
}