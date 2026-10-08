package com.aerosaga.backend;

import com.aerosaga.backend.temporal.DroneActivityImpl;
import com.aerosaga.backend.temporal.DroneWorkflowImpl;
import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AeroSagaApplication {

    public static final String TASK_QUEUE = "DRONE_TASK_QUEUE";

    public static void main(String[] args) {
        SpringApplication.run(AeroSagaApplication.class, args);
    }

    @PostConstruct
    public void startWorker() {

        WorkflowServiceStubs service =
                WorkflowServiceStubs.newLocalServiceStubs();

        WorkflowClient client =
                WorkflowClient.newInstance(service);

        WorkerFactory factory =
                WorkerFactory.newInstance(client);

        Worker worker =
                factory.newWorker(TASK_QUEUE);

        worker.registerWorkflowImplementationTypes(
                DroneWorkflowImpl.class
        );

        worker.registerActivitiesImplementations(
                new DroneActivityImpl()
        );

        factory.start();

        System.out.println(
                "Temporal Worker started on task queue: "
                        + TASK_QUEUE
        );
    }
}