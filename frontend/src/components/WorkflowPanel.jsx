import React, { useState, useEffect } from 'react';
import './WorkflowPanel.css';

/**
 * Standard Drone Mission Workflow DAG steps matching Temporal activities:
 * 1. Battery Check (pre-flight validation)
 * 2. Takeoff
 * 3. Navigate / Transit to destination
 * 4. Drop / Deliver Package
 * 5. Return to Base
 */
export const DEFAULT_MISSION_STEPS = [
  { id: 'checkBattery', label: 'Battery Check', description: 'Pre-flight capacity check (>30%)' },
  { id: 'takeoff', label: 'Takeoff', description: 'Ascent to cruising altitude' },
  { id: 'navigate', label: 'Navigate', description: 'En route to waypoint target' },
  { id: 'deliverPackage', label: 'Drop Package', description: 'Payload delivery & confirmation' },
  { id: 'returnToBase', label: 'Return to Base', description: 'RTB & automated landing' },
];

export default function WorkflowPanel({
  selectedDrone,
  selectedDroneId,
  isSimulated = true,
  onTriggerMission,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const [triggerResult, setTriggerResult] = useState(null);

  // Clear notice after 4 seconds
  useEffect(() => {
    if (triggerResult) {
      const timer = setTimeout(() => setTriggerResult(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [triggerResult]);

  if (!selectedDrone) {
    return (
      <aside className={`workflow-panel ${isOpen ? 'is-open' : 'is-collapsed'}`}>
        <button
          className="workflow-panel-toggle"
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle Mission Workflow DAG"
        >
          <span>🚁</span>
          {isOpen ? '◀' : '▶'}
        </button>
        {isOpen && (
          <div className="workflow-content">
            <header className="workflow-header">
              <span className="workflow-badge">TEMPORAL DAG</span>
              <h2>Mission Workflow</h2>
            </header>
            <p className="workflow-empty">Select a drone to inspect its live mission workflow DAG.</p>
          </div>
        )}
      </aside>
    );
  }

  // Derive workflow state based on drone telemetry / Temporal state
  const isOffline = selectedDrone.status === 'OFFLINE';
  const isIdle = selectedDrone.status === 'IDLE';
  const isLowBattery = selectedDrone.battery < 30;

  // Determine overall status
  let workflowStatus = 'RUNNING';
  let statusBadgeClass = 'status-running';

  if (isOffline) {
    workflowStatus = 'SUSPENDED / WAITING';
    statusBadgeClass = 'status-suspended';
  } else if (isIdle) {
    workflowStatus = 'STANDBY';
    statusBadgeClass = 'status-standby';
  } else if (isLowBattery && selectedDrone.battery < 25) {
    workflowStatus = 'FAILED (LOW BATTERY)';
    statusBadgeClass = 'status-failed';
  }

  // Calculate dynamic step statuses for the DAG
  const steps = (selectedDrone.workflowSteps || DEFAULT_MISSION_STEPS).map((step, idx) => {
    let state = 'PENDING'; // 'COMPLETED' | 'ACTIVE' | 'PENDING' | 'FAILED'

    if (isOffline) {
      // If offline, preserve progress or mark current step as waiting
      if (idx === 0) state = 'COMPLETED';
      else if (idx === 1) state = 'SUSPENDED';
      else state = 'PENDING';
    } else if (isIdle) {
      state = 'PENDING';
    } else if (isLowBattery && idx >= 2) {
      state = idx === 2 ? 'FAILED' : idx === 4 ? 'ACTIVE' : 'SKIPPED';
    } else {
      // Active drone simulation: derive progress from elapsed or drone state
      // Use drone battery and mission to position active step
      const missionCycle = selectedDrone.workflowStepIndex ?? (Math.floor(selectedDrone.altitude / 50) % 5);
      if (idx < missionCycle) {
        state = 'COMPLETED';
      } else if (idx === missionCycle) {
        state = 'ACTIVE';
      } else {
        state = 'PENDING';
      }
    }

    return {
      ...step,
      state,
    };
  });

  const handleStartMissionApi = async () => {
    setTriggering(true);
    setTriggerResult(null);
    try {
      if (onTriggerMission) {
        await onTriggerMission(selectedDrone.droneId);
        setTriggerResult({ ok: true, msg: 'Temporal mission triggered successfully!' });
      } else {
        const res = await fetch(`http://localhost:8080/api/missions/${selectedDrone.droneId}`, {
          method: 'POST',
        });
        if (res.ok) {
          const data = await res.json();
          setTriggerResult({ ok: true, msg: `Workflow started: ${data.workflowId}` });
        } else {
          setTriggerResult({ ok: false, msg: `Backend HTTP ${res.status}: Check Spring Boot / Temporal` });
        }
      }
    } catch (err) {
      setTriggerResult({ ok: false, msg: `Backend offline (using live simulation): ${err.message}` });
    } finally {
      setTriggering(false);
    }
  };

  return (
    <aside className={`workflow-panel ${isOpen ? 'is-open' : 'is-collapsed'}`}>
      <button
        type="button"
        className="workflow-panel-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Collapse Workflow DAG' : 'Expand Mission Workflow DAG'}
      >
        <span className="toggle-icon">🚁</span>
        <span className="toggle-arrow">{isOpen ? '◀' : '▶'}</span>
      </button>

      {isOpen && (
        <div className="workflow-content">
          <header className="workflow-header">
            <div className="workflow-header-top">
              <span className="workflow-badge">TEMPORAL DAG</span>
              <span className={`workflow-status-badge ${statusBadgeClass}`}>
                <span className="pulse-dot" />
                {workflowStatus}
              </span>
            </div>
            <div className="workflow-drone-title">
              <h2>Mission Workflow</h2>
              <span className="drone-id-tag">{selectedDrone.droneId}</span>
            </div>
            <p className="mission-name-sub">
              {selectedDrone.mission || 'DELIVERY-WORKFLOW'}
            </p>
          </header>

          <div className="dag-container" role="list" aria-label="Mission Workflow Steps">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <div key={step.id} className="dag-node-wrapper">
                  <div className={`dag-node dag-state-${step.state.toLowerCase()}`} role="listitem">
                    <div className="dag-node-indicator">
                      {step.state === 'COMPLETED' && <span className="dag-icon icon-check">✓</span>}
                      {step.state === 'ACTIVE' && <span className="dag-icon icon-active">▶</span>}
                      {step.state === 'PENDING' && <span className="dag-icon icon-pending">○</span>}
                      {step.state === 'SUSPENDED' && <span className="dag-icon icon-suspended">⏸</span>}
                      {step.state === 'FAILED' && <span className="dag-icon icon-failed">✕</span>}
                      {step.state === 'SKIPPED' && <span className="dag-icon icon-skipped">⊘</span>}
                    </div>

                    <div className="dag-node-info">
                      <div className="dag-node-title-row">
                        <strong className="dag-node-name">{step.label}</strong>
                        <span className={`dag-node-pill pill-${step.state.toLowerCase()}`}>
                          {step.state === 'ACTIVE' ? 'Active' : step.state === 'COMPLETED' ? 'Completed' : step.state}
                        </span>
                      </div>
                      <span className="dag-node-desc">{step.description}</span>
                    </div>
                  </div>

                  {!isLast && (
                    <div className={`dag-arrow-connector ${steps[index].state === 'COMPLETED' ? 'connector-done' : ''}`}>
                      <span className="arrow-line" />
                      <span className="arrow-head">↓</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <footer className="workflow-footer">
            <div className="footer-metrics">
              <div className="footer-metric">
                <span className="f-label">Battery Level</span>
                <span className={`f-value ${selectedDrone.battery < 30 ? 'warn-batt' : ''}`}>
                  {selectedDrone.battery}%
                </span>
              </div>
              <div className="footer-metric">
                <span className="f-label">Workflow Mode</span>
                <span className="f-value mode-val">{isSimulated ? 'Live Reactive' : 'Temporal WS'}</span>
              </div>
            </div>

            <div className="trigger-action-container">
              <button
                type="button"
                className="trigger-workflow-btn"
                onClick={handleStartMissionApi}
                disabled={triggering || isOffline}
                title="Post to /api/missions/{droneId} to trigger Temporal Workflow"
              >
                {triggering ? 'Triggering...' : 'Dispatch Mission (Temporal)'}
              </button>
              {triggerResult && (
                <div className={`trigger-toast ${triggerResult.ok ? 'toast-success' : 'toast-info'}`}>
                  {triggerResult.msg}
                </div>
              )}
            </div>

            <div className="temporal-legend">
              <span>● Complete ✓</span>
              <span>● Active ▶</span>
              <span>● Pending ○</span>
            </div>
          </footer>
        </div>
      )}
    </aside>
  );
}
