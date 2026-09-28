package com.aerosaga.backend;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import javax.annotation.PostConstruct;

import com.aerosaga.backend.temporal.DroneWorkflowImpl;
import com.aerosaga.backend.temporal.DroneActivityImpl;

@SpringBootApplication
public class AeroSagaApplication {

    public static final String TASK_QUEUE = "DRONE_TASK_QUEUE";

    public static void main(String[] args) {
        SpringApplication.run(AeroSagaApplication.class, args);
    }

    @Bean
    public WorkflowServiceStubs workflowServiceStubs() {
        return WorkflowServiceStubs.newLocalServiceStubs();
    }

    @Bean
    public WorkflowClient workflowClient(WorkflowServiceStubs workflowServiceStubs) {
        return WorkflowClient.newInstance(workflowServiceStubs);
    }

    @Bean
    public WorkerFactory workerFactory(WorkflowClient workflowClient) {
        return WorkerFactory.newInstance(workflowClient);
    }

    @Bean
    public DroneActivityImpl droneActivity() {
        return new DroneActivityImpl();
    }

    @PostConstruct
    public void startWorker() {
        WorkflowServiceStubs service = workflowServiceStubs();
        WorkflowClient client = workflowClient(service);
        WorkerFactory factory = workerFactory(client);
        
        Worker worker = factory.newWorker(TASK_QUEUE);
        worker.registerWorkflowImplementationTypes(DroneWorkflowImpl.class);
        worker.registerActivitiesImplementations(droneActivity());
        
        factory.start();
        System.out.println("Temporal Worker started on task queue: " + TASK_QUEUE);
    }
}
