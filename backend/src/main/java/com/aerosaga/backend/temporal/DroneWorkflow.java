
package com.aerosaga.backend.temporal;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;
import io.temporal.workflow.QueryMethod;

@WorkflowInterface
public interface DroneWorkflow {

    @WorkflowMethod
    void executeMission(String droneId);

    @QueryMethod
    String getStatus();
}
