import React from 'react';
import './TelemetryPanel.css';

export default function TelemetryPanel({ telemetry, status, lastUpdateTime }) {
  const drones = Object.values(telemetry);

  return (
    <div className="telemetry-panel">
      <div className="panel-header">
        <h2>AEROSAGA LIVE TELEMETRY</h2>
        <div className={`status-indicator status-${status.toLowerCase()}`}>
          <span className="dot"></span>
          WebSocket: {status}
        </div>
        {lastUpdateTime && (
          <div className="update-time">
            Last Update: {lastUpdateTime.toLocaleTimeString()}
          </div>
        )}
      </div>
      
      <div className="drones-container">
        {drones.length === 0 && status === 'CONNECTED' && (
          <p className="no-data">Waiting for telemetry data...</p>
        )}
        
        {drones.map(drone => (
          <div key={drone.droneId} className="drone-card">
            <h3>{drone.droneId}</h3>
            <div className="drone-stats">
              <div className="stat-row">
                <span className="label">Latitude:</span>
                <span className="value">{drone.latitude.toFixed(4)}</span>
              </div>
              <div className="stat-row">
                <span className="label">Longitude:</span>
                <span className="value">{drone.longitude.toFixed(4)}</span>
              </div>
              <div className="stat-row">
                <span className="label">Altitude:</span>
                <span className="value">{Math.round(drone.altitude)} m</span>
              </div>
              <div className="stat-row">
                <span className="label">Speed:</span>
                <span className="value">{Math.round(drone.speed)} m/s</span>
              </div>
              <div className="stat-row">
                <span className="label">Heading:</span>
                <span className="value">{Math.round(drone.heading)}&deg;</span>
              </div>
              <div className="stat-row">
                <span className="label">Status:</span>
                <span className="value active">ACTIVE</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
