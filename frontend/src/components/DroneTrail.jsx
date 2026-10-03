import React from 'react';
import { Entity, PolylineGraphics } from 'resium';
import { Cartesian3, Color } from 'cesium';

export default function DroneTrail({ positions, selected }) {
  if (!positions || positions.length < 2) return null;
  const cartesianPositions = positions.map((point) =>
    Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude),
  );

  return (
    <Entity>
      <PolylineGraphics
        positions={cartesianPositions}
        width={selected ? 4 : 1.5}
        material={Color.fromCssColorString(selected ? '#ffbd59' : '#54e0c1').withAlpha(selected ? 0.9 : 0.28)}
      />
    </Entity>
  );
}
