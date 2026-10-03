import React from 'react';
import './TelemetryPanel.css';

function Metric({ label, value, unit }) {
  return (
    <div className="metric">
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value}<small>{unit}</small></span>
    </div>
  );
}

export default function TelemetryPanel({
  telemetry,
  selectedDrone,
  selectedDroneId,
  onSelectDrone,
  fleetSize,
  onFleetSizeChange,
  running,
  onToggleSimulation,
  fps,
  updatesPerSecond,
}) {
  const drones = Object.values(telemetry);
  const active = drones.filter((drone) => drone.status === 'ACTIVE').length;
  const idle = drones.filter((drone) => drone.status === 'IDLE').length;
  const offline = drones.filter((drone) => drone.status === 'OFFLINE').length;
  const activeMissions = drones.filter((drone) => drone.mission !== 'STANDBY').length;
  const averageSpeed = active
    ? Math.round(drones.reduce((sum, drone) => sum + drone.speed, 0) / active)
    : 0;

  return (
    <aside className="telemetry-panel" aria-label="Fleet mission control">
      <header className="panel-header">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">A</span>
          <div>
            <p className="eyebrow">AEROSAGA / OPERATIONS</p>
            <h1>Fleet control</h1>
          </div>
        </div>
        <span className={`sim-status ${running ? 'is-running' : ''}`}>
          <span className="status-dot" />{running ? 'LIVE SIM' : 'PAUSED'}
        </span>
      </header>

      <section className="fleet-section" aria-labelledby="fleet-heading">
        <div className="section-heading">
          <h2 id="fleet-heading">Fleet overview</h2>
          <span className="fleet-total">{drones.length} AIRCRAFT</span>
        </div>
        <div className="metric-grid">
          <Metric label="Active" value={active} unit="" />
          <Metric label="Idle" value={idle} unit="" />
          <Metric label="Offline" value={offline} unit="" />
          <Metric label="On mission" value={activeMissions} unit="" />
        </div>
        <div className="fleet-summary">
          <span>Average speed</span>
          <strong>{averageSpeed}<small> km/h</small></strong>
        </div>
      </section>

      <section className="drone-detail" aria-labelledby="selected-heading">
        <div className="section-heading">
          <h2 id="selected-heading">Selected aircraft</h2>
          {selectedDrone && <span className={`state-label state-${selectedDrone.status.toLowerCase()}`}>{selectedDrone.status}</span>}
        </div>
        {selectedDrone ? (
          <>
            <p className="selected-id">{selectedDrone.droneId}</p>
            <div className="detail-grid">
              <Metric label="Altitude" value={Math.round(selectedDrone.altitude)} unit="m" />
              <Metric label="Speed" value={Math.round(selectedDrone.speed)} unit="km/h" />
              <Metric label="Heading" value={Math.round(selectedDrone.heading)} unit="°" />
              <Metric label="Battery" value={selectedDrone.battery} unit="%" />
            </div>
            <div className="mission-line"><span>Current mission</span><strong>{selectedDrone.mission}</strong></div>
            <div className="coordinates">
              <span>{selectedDrone.latitude.toFixed(4)}° N</span>
              <span>{Math.abs(selectedDrone.longitude).toFixed(4)}° W</span>
            </div>
          </>
        ) : <p className="empty-state">Select an aircraft to inspect its telemetry.</p>}
      </section>

      <section className="simulation-controls" aria-label="Simulation controls">
        <div className="section-heading">
          <h2>Simulation</h2>
          <button className="run-button" type="button" onClick={onToggleSimulation}>
            {running ? 'Pause' : 'Resume'}
          </button>
        </div>
        <label className="fleet-size-label" htmlFor="fleet-size">
          <span>Fleet size</span><strong>{fleetSize} drones</strong>
        </label>
        <input
          id="fleet-size"
          type="range"
          min="50"
          max="100"
          step="10"
          value={fleetSize}
          onChange={(event) => onFleetSizeChange(Number(event.target.value))}
        />
        <div className="range-labels"><span>50</span><span>100</span></div>
      </section>

      <section className="performance-section" aria-labelledby="performance-heading">
        <div className="section-heading">
          <h2 id="performance-heading">Render performance</h2>
          <span className="render-state"><span className="status-dot" />{fps >= 30 ? 'STABLE' : 'MEASURING'}</span>
        </div>
        <div className="performance-values">
          <Metric label="Frame rate" value={fps || '--'} unit="fps" />
          <Metric label="Telemetry" value={updatesPerSecond || '--'} unit="/s" />
        </div>
        <p className="feed-note">LOCAL SIMULATION <span>·</span> 10 Hz SOURCE</p>
      </section>

      <section className="fleet-list-section" aria-labelledby="roster-heading">
        <div className="section-heading">
          <h2 id="roster-heading">Aircraft roster</h2>
          <span className="fleet-total">{drones.length}</span>
        </div>
        <div className="drone-list">
          {drones.map((drone) => (
            <button
              key={drone.droneId}
              type="button"
              className={`drone-row ${drone.droneId === selectedDroneId ? 'is-selected' : ''}`}
              onClick={() => onSelectDrone(drone.droneId)}
              aria-pressed={drone.droneId === selectedDroneId}
            >
              <span className={`drone-state-dot state-${drone.status.toLowerCase()}`} />
              <span className="drone-row-id">{drone.droneId}</span>
              <span className="drone-row-mission">{drone.mission}</span>
              <span className="drone-row-speed">{Math.round(drone.speed)}</span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
