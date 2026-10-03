package com.aerosaga.backend.temporal;

import java.time.Duration;

import org.slf4j.Logger;

import io.temporal.activity.ActivityOptions;
import io.temporal.common.RetryOptions;
import io.temporal.workflow.Workflow;

public class DroneWorkflowImpl implements DroneWorkflow {

    private static final Logger logger =
            Workflow.getLogger(DroneWorkflowImpl.class);

    private boolean emergencyAbortRequested = false;
    
    private String status = "STARTING";
    
    @Override
    public String getStatus() {
        return status;
    }

    private final DroneActivity activity =
            Workflow.newActivityStub(
                    DroneActivity.class,
                    ActivityOptions.newBuilder()
                            .setStartToCloseTimeout(
                                    Duration.ofSeconds(30))
                            .setRetryOptions(
                                    RetryOptions.newBuilder()
                                            .setInitialInterval(
                                                    Duration.ofSeconds(2))
                                            .setMaximumAttempts(3)
                                            .build()
                            )
                            .build()
            );

    @Override
    public void emergencyAbort() {

        emergencyAbortRequested = true;

        logger.info("Emergency abort requested");
    }

    @Override
    public void executeMission(String droneId) {

        status = "CHECKING_BATTERY";
        logger.info("Mission started for {}", droneId);

        int battery = activity.checkBattery(droneId);

        if (battery < 30) {
            status = "ABORTED_LOW_BATTERY";

            logger.info(
                    "Battery too low for {}. Mission aborted.",
                    droneId
            );

            return;
        }

        status = "TAKING_OFF";
        activity.takeoff(droneId);

        status = "WAITING_FOR_ABORT";
        logger.info(
                "Waiting for emergency abort signal for {}",
                droneId
        );

        Workflow.await(
                Duration.ofSeconds(30),
                () -> emergencyAbortRequested
        );

        if (emergencyAbortRequested) {

            status = "EMERGENCY_ABORT";

            logger.info(
                    "Emergency abort detected for {}",
                    droneId
            );

            status = "RETURNING_TO_BASE";
            activity.returnToBase(droneId);

            status = "ABORTED";

            logger.info(
                    "{} returned to base after emergency abort",
                    droneId
            );

            return;
        }

        status = "TRAVELLING";
        activity.travelToDestination(droneId);

        if (emergencyAbortRequested) {

            status = "EMERGENCY_ABORT";
            status = "RETURNING_TO_BASE";

            activity.returnToBase(droneId);

            status = "ABORTED";

            return;
        }

        status = "DELIVERING";

        try {

            activity.deliverPackage(droneId);

            logger.info(
                    "{} package delivered successfully",
                    droneId
            );

        } catch (Exception e) {

            status = "DELIVERY_FAILED";

            logger.error(
                    "Delivery failed for {}. Starting recovery.",
                    droneId
            );

            status = "RETURNING_TO_BASE";
            activity.returnToBase(droneId);

            status = "FAILED";

            logger.info(
                    "{} returned to base after delivery failure",
                    droneId
            );

            return;
        }

        status = "RETURNING_TO_BASE";
        activity.returnToBase(droneId);

        status = "COMPLETED";

        logger.info(
                "Mission completed for {}",
                droneId
        );
    }
}