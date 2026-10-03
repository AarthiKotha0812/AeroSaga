import React, { useRef, useEffect } from 'react';
import { Viewer, CameraFlyTo } from 'resium';
import { Cartesian3 } from 'cesium';
import DroneMarker from './DroneMarker';
import DroneTrail from './DroneTrail';

export default function CesiumMap({ telemetry, trails }) {
  const viewerRef = useRef(null);
  const initialized = useRef(false);

  const drones = Object.values(telemetry);

  // Focus on the first drone when data arrives
  useEffect(() => {
    if (!initialized.current && drones.length > 0 && viewerRef.current?.cesiumElement) {
      const firstDrone = drones[0];
      viewerRef.current.cesiumElement.camera.flyTo({
        destination: Cartesian3.fromDegrees(firstDrone.longitude, firstDrone.latitude, 5000),
        duration: 2
      });
      initialized.current = true;
    }
  }, [drones]);

  return (
    <Viewer ref={viewerRef} full animation={false} timeline={false} infoBox={false} navigationHelpButton={false}>
      {drones.map(drone => (
        <DroneMarker key={`marker-${drone.droneId}`} drone={drone} />
      ))}
      {Object.entries(trails).map(([droneId, positions]) => (
        <DroneTrail key={`trail-${droneId}`} positions={positions} />
      ))}
    </Viewer>
  );
}
