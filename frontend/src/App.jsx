import React, { useState } from 'react';
import CesiumMap from './components/CesiumMap';
import TelemetryPanel from './components/TelemetryPanel';
import { useFleetSimulation } from './hooks/useFleetSimulation';
import './App.css';

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
  const selectedDrone = telemetry[selectedDroneId] ?? null;

  return (
    <div className="app-container">
      <CesiumMap
        telemetry={telemetry}
        trails={trails}
        selectedDroneId={selectedDroneId}
        onSelectDrone={setSelectedDroneId}
      />
      <TelemetryPanel
        telemetry={telemetry}
        selectedDrone={selectedDrone}
        selectedDroneId={selectedDroneId}
        onSelectDrone={setSelectedDroneId}
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
