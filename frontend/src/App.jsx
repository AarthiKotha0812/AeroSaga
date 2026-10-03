import React from 'react';
import CesiumMap from './components/CesiumMap';
import TelemetryPanel from './components/TelemetryPanel';
import { useTelemetry } from './hooks/useTelemetry';
import './App.css';

const WS_URL = 'ws://localhost:8080/ws/telemetry';

export default function App() {
  const { telemetry, trails, status, lastUpdateTime } = useTelemetry(WS_URL);

  return (
    <div className="app-container">
      <CesiumMap telemetry={telemetry} trails={trails} />
      <TelemetryPanel telemetry={telemetry} status={status} lastUpdateTime={lastUpdateTime} />
    </div>
  );
}
