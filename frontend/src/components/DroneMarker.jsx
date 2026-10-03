import React from 'react'; // Week 2
import { Entity, PointGraphics, LabelGraphics } from 'resium';
import { Cartesian3, Color, Cartesian2, NearFarScalar } from 'cesium';

export default function DroneMarker({ drone }) {
  const position = Cartesian3.fromDegrees(drone.longitude, drone.latitude, drone.altitude);

  return (
    <Entity position={position} name={drone.droneId} description={`Live tracking for ${drone.droneId}`}>
      <PointGraphics 
        pixelSize={16} 
        color={Color.fromCssColorString('#38bdf8')} 
        outlineColor={Color.WHITE} 
        outlineWidth={2}
      />
      <LabelGraphics 
        text={drone.droneId}
        font="14px Inter, sans-serif"
        fillColor={Color.WHITE}
        outlineColor={Color.BLACK}
        outlineWidth={2}
        showBackground={true}
        backgroundColor={Color.fromCssColorString('rgba(15, 23, 42, 0.7)')}
        pixelOffset={new Cartesian2(0, -20)}
        scaleByDistance={new NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)}
      />
    </Entity>
  );
}
