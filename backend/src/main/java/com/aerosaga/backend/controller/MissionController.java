
package com.aerosaga.backend.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aerosaga.backend.AeroSagaApplication;
import com.aerosaga.backend.temporal.DroneWorkflow;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

    private final WorkflowClient workflowClient;

    public MissionController(WorkflowClient workflowClient) {
        this.workflowClient = workflowClient;
    }

    @PostMapping("/{droneId}")
    public Map<String, String> startMission(
            @PathVariable String droneId) {

        String workflowId =
                "mission-" + droneId + "-" + UUID.randomUUID();

        DroneWorkflow workflow =
                workflowClient.newWorkflowStub(
                        DroneWorkflow.class,
                        WorkflowOptions.newBuilder()
                                .setWorkflowId(workflowId)
                                .setTaskQueue(
                                        AeroSagaApplication.TASK_QUEUE)
                                .build()
                );

        WorkflowClient.start(
                workflow::executeMission,
                droneId
        );

        Map<String, String> response = new HashMap<>();
        response.put("message", "Drone mission started");
        response.put("droneId", droneId);
        response.put("workflowId", workflowId);
        response.put("status", "STARTED");

        return response;
    }

    @GetMapping("/{workflowId}/status")
    public Map<String, String> getMissionStatus(
            @PathVariable String workflowId) {

        Map<String, String> response = new HashMap<>();
        response.put("workflowId", workflowId);

        try {
            DroneWorkflow workflow =
                    workflowClient.newWorkflowStub(
                            DroneWorkflow.class,
                            workflowId
                    );

            response.put("status", workflow.getStatus());

        } catch (Exception e) {
            response.put("status", "STATUS_UNAVAILABLE");
            response.put("message",
                    "Unable to retrieve mission status from Temporal");
        }

        return response;
    }
}
