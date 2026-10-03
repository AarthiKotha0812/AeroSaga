package com.aerosaga.backend.model;

public class TelemetryData {
    private String droneId;
    private double latitude;
    private double longitude;
    private double altitude;
    private double speed;
    private double heading;

    public TelemetryData(String droneId, double latitude, double longitude, double altitude, double speed, double heading) {
        this.droneId = droneId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.speed = speed;
        this.heading = heading;
    }

    public String getDroneId() { return droneId; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
    public double getAltitude() { return altitude; }
    public double getSpeed() { return speed; }
    public double getHeading() { return heading; }
}
