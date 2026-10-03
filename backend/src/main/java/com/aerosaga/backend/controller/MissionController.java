package com.aerosaga.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import com.aerosaga.backend.AeroSagaApplication;
import com.aerosaga.backend.temporal.DroneWorkflow;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.client.WorkflowStub;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

    private final WorkflowClient workflowClient;

    public MissionController(WorkflowClient workflowClient) {
        this.workflowClient = workflowClient;
    }

    // Start a new drone mission
    @PostMapping("/{droneId}")
    public Map<String, String> startMission(
            @PathVariable String droneId) {

        String workflowId = "mission-" + droneId;

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

    // Send emergency abort signal to running mission
    @PostMapping("/{droneId}/abort")
    public Map<String, String> emergencyAbort(
            @PathVariable String droneId) {

        String workflowId = "mission-" + droneId;

        WorkflowStub workflowStub =
                workflowClient.newUntypedWorkflowStub(workflowId);

        workflowStub.signal("emergencyAbort");

        Map<String, String> response = new HashMap<>();

        response.put(
                "message",
                "Emergency abort signal sent"
        );
        response.put("droneId", droneId);
        response.put("status", "ABORT_REQUESTED");

        return response;
    }
    
 // Get current mission status
 // Get current mission status
    @GetMapping("/{droneId}/status")
    public Map<String, String> getMissionStatus(
            @PathVariable String droneId) {

        String workflowId = "mission-" + droneId;

        WorkflowStub workflowStub =
                workflowClient.newUntypedWorkflowStub(workflowId);

        String status =
                workflowStub.query(
                        "getStatus",
                        String.class
                );

        Map<String, String> response = new HashMap<>();

        response.put("droneId", droneId);
        response.put("status", status);

        return response;
    }
}