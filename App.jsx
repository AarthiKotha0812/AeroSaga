import Header from './components/Header';
import FleetList from './components/FleetList';
import MissionPanel from './components/MissionPanel';
import DroneMap from './components/DroneMap';
import MapOverlay from './components/MapOverlay';
import { useWebSocket } from './hooks/useWebSocket';
import { useMockTelemetry } from './hooks/useMockTelemetry';
import './App.css';

export default function App() {
  useWebSocket();
  useMockTelemetry(true);

  return (
    <div className="app">
      <Header />
      <div className="workspace">
        <FleetList />
        <div className="globe-container">
          <DroneMap />
          <MapOverlay />
        </div>
        <MissionPanel />
      </div>
    </div>
  );
}
