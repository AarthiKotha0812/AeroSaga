package com.aerosaga.backend.temporal;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

@WorkflowInterface
public interface DroneWorkflow {
    
    @WorkflowMethod
    void executeMission(String droneId);
}
