import React from 'react';
import { Entity, PointGraphics, LabelGraphics } from 'resium';
import { Cartesian3, Color, Cartesian2, NearFarScalar } from 'cesium';

export default function DroneMarker({ drone, selected }) {
  const position = Cartesian3.fromDegrees(drone.longitude, drone.latitude, drone.altitude);
  const color = drone.status === 'OFFLINE'
    ? Color.fromCssColorString('#8b949e')
    : drone.status === 'IDLE'
      ? Color.fromCssColorString('#f4b942')
      : Color.fromCssColorString('#54e0c1');

  return (
    <Entity id={drone.droneId} position={position} name={drone.droneId} description={`${drone.status} / ${drone.mission}`}>
      <PointGraphics
        pixelSize={selected ? 15 : 9}
        color={color}
        outlineColor={selected ? Color.WHITE : Color.fromCssColorString('#111820')}
        outlineWidth={selected ? 3 : 1}
      />
      <LabelGraphics
        text={selected ? drone.droneId : ''}
        font="12px Bahnschrift, sans-serif"
        fillColor={Color.WHITE}
        outlineColor={Color.fromCssColorString('#111820')}
        outlineWidth={3}
        showBackground={selected}
        backgroundColor={Color.fromCssColorString('rgba(13, 20, 25, 0.88)')}
        pixelOffset={new Cartesian2(0, -18)}
        scaleByDistance={new NearFarScalar(1.5e2, 1.2, 1.5e7, 0.5)}
      />
    </Entity>
  );
}
