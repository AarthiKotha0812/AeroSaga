import React, { useRef, useEffect } from 'react';
import { Viewer, CameraFlyTo } from 'resium';
import { Cartesian3, ScreenSpaceEventType } from 'cesium';
import DroneMarker from './DroneMarker';
import DroneTrail from './DroneTrail';

export default function CesiumMap({ telemetry, trails, selectedDroneId, onSelectDrone }) {
  const viewerRef = useRef(null);
  const initialized = useRef(false);

  const drones = Object.values(telemetry);

  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return undefined;

    const handleClick = (movement) => {
      const picked = viewer.scene.pick(movement.position);
      const entity = picked?.id;
      if (typeof entity?.id === 'string' && entity.id.startsWith('DRONE-')) {
        onSelectDrone(entity.id);
      }
    };

    viewer.screenSpaceEventHandler.setInputAction(handleClick, ScreenSpaceEventType.LEFT_CLICK);
    return () => viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
  }, [onSelectDrone]);

  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    const selectedDrone = telemetry[selectedDroneId];
    if (!initialized.current && selectedDrone && viewer) {
      viewer.camera.flyTo({
        destination: Cartesian3.fromDegrees(selectedDrone.longitude, selectedDrone.latitude, 180000),
        duration: 2,
      });
      initialized.current = true;
    }
  }, [telemetry, selectedDroneId]);

  return (
    <Viewer ref={viewerRef} full animation={false} timeline={false} infoBox={false} navigationHelpButton={false} baseLayerPicker={false} geocoder={false} homeButton={false} sceneModePicker={false}>
      {drones.map((drone) => (
        <DroneMarker
          key={`marker-${drone.droneId}`}
          drone={drone}
          selected={drone.droneId === selectedDroneId}
        />
      ))}
      {Object.entries(trails).map(([droneId, positions]) => (
        <DroneTrail
          key={`trail-${droneId}`}
          positions={positions}
          selected={droneId === selectedDroneId}
        />
      ))}
    </Viewer>
  );
}
