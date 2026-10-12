import React, { useMemo, useState } from 'react';
import CesiumMap from './components/CesiumMap';
import TelemetryPanel from './components/TelemetryPanel';
import WorkflowPanel from './components/WorkflowPanel';
import { useFleetSimulation } from './hooks/useFleetSimulation';
import './App.css';
import './animations.css';

export default function App() {
  const {
    telemetry,
    trails,
    running,
    fleetSize,
    setFleetSize,
    toggleSimulation,
    fps,
    updatesPerSecond,
  } = useFleetSimulation();

  const [selectedDroneId, setSelectedDroneId] = useState('DRONE-002');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all');

  const filteredTelemetry = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return Object.fromEntries(
      Object.entries(telemetry).filter(([droneId, drone]) => {
        const matchesQuery = !query ||
          droneId.toLowerCase().includes(query) ||
          drone.status.toLowerCase().includes(query) ||
          drone.mission.toLowerCase().includes(query);

        const matchesFilter = filterMode === 'all'
          || (filterMode === 'active' && drone.status === 'ACTIVE')
          || (filterMode === 'idle' && drone.status === 'IDLE')
          || (filterMode === 'offline' && drone.status === 'OFFLINE');

        return matchesQuery && matchesFilter;
      }),
    );
  }, [telemetry, searchTerm, filterMode]);

  const selectedDrone = filteredTelemetry[selectedDroneId] ?? Object.values(filteredTelemetry)[0] ?? null;

  const handleSelectDrone = (droneId) => {
    if (filteredTelemetry[droneId]) {
      setSelectedDroneId(droneId);
    }
  };

  const resetView = () => {
    setSearchTerm('');
    setFilterMode('all');
    setSelectedDroneId('DRONE-002');
  };

  return (
    <div className="app-container">
      <div className="top-toolbar" aria-label="Drone search and filters">
        <div className="toolbar-search">
          <span className="toolbar-icon" aria-hidden="true">⌕</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search drone or status"
            aria-label="Search drones"
          />
        </div>

        <div className="toolbar-actions">
          <button type="button" className={filterMode === 'all' ? 'active' : ''} onClick={() => setFilterMode('all')}>All</button>
          <button type="button" className={filterMode === 'active' ? 'active' : ''} onClick={() => setFilterMode('active')}>Active</button>
          <button type="button" className={filterMode === 'idle' ? 'active' : ''} onClick={() => setFilterMode('idle')}>Idle</button>
          <button type="button" className={filterMode === 'offline' ? 'active' : ''} onClick={() => setFilterMode('offline')}>Offline</button>
          <button type="button" className="toolbar-reset" onClick={resetView}>Reset View</button>
        </div>
      </div>

      <CesiumMap
        telemetry={filteredTelemetry}
        trails={Object.fromEntries(Object.entries(trails).filter(([droneId]) => filteredTelemetry[droneId]))}
        selectedDroneId={selectedDrone?.droneId ?? selectedDroneId}
        onSelectDrone={handleSelectDrone}
      />
      <WorkflowPanel
        selectedDrone={selectedDrone}
        selectedDroneId={selectedDrone?.droneId ?? selectedDroneId}
        isSimulated={true}
      />
      <TelemetryPanel
        telemetry={filteredTelemetry}
        selectedDrone={selectedDrone}
        selectedDroneId={selectedDrone?.droneId ?? selectedDroneId}
        onSelectDrone={handleSelectDrone}
        fleetSize={fleetSize}
        onFleetSizeChange={setFleetSize}
        running={running}
        onToggleSimulation={toggleSimulation}
        fps={fps}
        updatesPerSecond={updatesPerSecond}
      />
    </div>
  );
}
