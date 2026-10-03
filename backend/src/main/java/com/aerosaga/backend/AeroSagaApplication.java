
package com.aerosaga.backend;

import com.aerosaga.backend.temporal.DroneActivityImpl;
import com.aerosaga.backend.temporal.DroneWorkflowImpl;

import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AeroSagaApplication {

    public static final String TASK_QUEUE = "DRONE_TASK_QUEUE";

    public static void main(String[] args) {
        SpringApplication.run(AeroSagaApplication.class, args);
    }

    // Connect to the Temporal Server running in Docker
    @Bean
    public WorkflowServiceStubs workflowServiceStubs() {
        return WorkflowServiceStubs.newInstance(
                WorkflowServiceStubsOptions.newBuilder()
                        .setTarget("localhost:7233")
                        .build()
        );
    }

    // Create the Temporal client
    @Bean
    public WorkflowClient workflowClient(
            WorkflowServiceStubs workflowServiceStubs) {
        return WorkflowClient.newInstance(workflowServiceStubs);
    }

    // Create the worker factory
    @Bean
    public WorkerFactory workerFactory(WorkflowClient workflowClient) {
        return WorkerFactory.newInstance(workflowClient);
    }

    // Create the drone activity implementation
    @Bean
    public DroneActivityImpl droneActivity() {
        return new DroneActivityImpl();
    }

    // Register and start the worker
    @Bean
    public Worker droneWorker(
            WorkerFactory workerFactory,
            DroneActivityImpl droneActivity) {

        Worker worker = workerFactory.newWorker(TASK_QUEUE);

        worker.registerWorkflowImplementationTypes(
                DroneWorkflowImpl.class
        );

        worker.registerActivitiesImplementations(droneActivity);

        return worker;
    }

    // Start the worker factory after Spring creates the beans
    @Bean
    public WorkerFactoryStarter workerFactoryStarter(
            WorkerFactory workerFactory) {
        workerFactory.start();
        System.out.println(
                "Temporal Worker started on task queue: " + TASK_QUEUE
        );
        return new WorkerFactoryStarter();
    }

    public static class WorkerFactoryStarter {
    }
}