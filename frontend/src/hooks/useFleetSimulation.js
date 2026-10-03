import { useEffect, useRef, useState } from 'react';

const MAX_TRAIL_POINTS = 18;
const TRAIL_SAMPLE_EVERY = 4;

function createDrone(index, elapsed = 0) {
  const id = `DRONE-${String(index + 1).padStart(3, '0')}`;
  const routePhase = index * 2.39996 + elapsed * (0.22 + (index % 5) * 0.018);
  const routeRadius = 0.11 + (index % 8) * 0.045;
  const status = index % 29 === 0 ? 'OFFLINE' : index % 9 === 0 ? 'IDLE' : 'ACTIVE';
  const missionNumber = (index % 18) + 1;

  return {
    droneId: id,
    latitude: 37.77 + Math.sin(routePhase) * routeRadius,
    longitude: -122.42 + Math.cos(routePhase) * routeRadius * 1.45,
    altitude: 110 + ((index * 37) % 250) + Math.sin(routePhase * 1.7) * 16,
    speed: status === 'ACTIVE' ? 32 + ((index * 13) % 24) : 0,
    heading: ((routePhase * 57.2958 + 90) % 360 + 360) % 360,
    status,
    mission: status === 'ACTIVE' ? `DELIVERY-${String(missionNumber).padStart(2, '0')}` : 'STANDBY',
    battery: Math.max(24, 98 - ((index * 7 + Math.floor(elapsed / 12)) % 72)),
  };
}

function createFleet(size, elapsed = 0) {
  return Object.fromEntries(Array.from({ length: size }, (_, index) => {
    const drone = createDrone(index, elapsed);
    return [drone.droneId, drone];
  }));
}

export function useFleetSimulation() {
  const [fleetSize, setFleetSize] = useState(50);
  const [running, setRunning] = useState(true);
  const [telemetry, setTelemetry] = useState(() => createFleet(50));
  const [trails, setTrails] = useState({});
  const [fps, setFps] = useState(0);
  const [updatesPerSecond, setUpdatesPerSecond] = useState(0);
  const fleetRef = useRef(telemetry);
  const elapsedRef = useRef(0);
  const tickRef = useRef(0);
  const updateCountRef = useRef(0);

  useEffect(() => {
    const nextFleet = createFleet(fleetSize, elapsedRef.current);
    fleetRef.current = nextFleet;
    setTelemetry(nextFleet);
    setTrails({});
  }, [fleetSize]);

  useEffect(() => {
    if (!running) return undefined;

    const interval = window.setInterval(() => {
      elapsedRef.current += 0.1;
      tickRef.current += 1;
      const nextFleet = Object.fromEntries(Array.from({ length: fleetSize }, (_, index) => {
        const drone = createDrone(index, elapsedRef.current);
        if (drone.status === 'OFFLINE') {
          const previous = fleetRef.current[drone.droneId];
          return [drone.droneId, previous ? { ...drone, latitude: previous.latitude, longitude: previous.longitude } : drone];
        }
        return [drone.droneId, drone];
      }));

      fleetRef.current = nextFleet;
      updateCountRef.current += 1;
      setTelemetry(nextFleet);

      if (tickRef.current % TRAIL_SAMPLE_EVERY === 0) {
        setTrails((previous) => Object.fromEntries(Object.values(nextFleet).map((drone) => {
          const points = previous[drone.droneId] ?? [];
          return [drone.droneId, [...points, {
            latitude: drone.latitude,
            longitude: drone.longitude,
            altitude: drone.altitude,
          }].slice(-MAX_TRAIL_POINTS)];
        })));
      }
    }, 100);

    return () => window.clearInterval(interval);
  }, [fleetSize, running]);

  useEffect(() => {
    let frames = 0;
    let animationFrame;
    let lastSample = performance.now();

    const sample = (now) => {
      frames += 1;
      if (now - lastSample >= 1000) {
        setFps(Math.round((frames * 1000) / (now - lastSample)));
        setUpdatesPerSecond(Math.round(updateCountRef.current / ((now - lastSample) / 1000)));
        frames = 0;
        updateCountRef.current = 0;
        lastSample = now;
      }
      animationFrame = window.requestAnimationFrame(sample);
    };

    animationFrame = window.requestAnimationFrame(sample);
    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  return {
    telemetry,
    trails,
    running,
    fleetSize,
    setFleetSize,
    toggleSimulation: () => setRunning((value) => !value),
    fps,
    updatesPerSecond,
  };
}