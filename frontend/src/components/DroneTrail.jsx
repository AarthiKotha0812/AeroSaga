import React from 'react'; // Week 2
import { Entity, PolylineGraphics } from 'resium';
import { Color } from 'cesium';

export default function DroneTrail({ positions }) {
  if (!positions || positions.length < 2) return null;

  return (
    <Entity>
      <PolylineGraphics
        positions={positions}
        width={3}
        material={Color.fromCssColorString('#38bdf8').withAlpha(0.6)}
      />
    </Entity>
  );
}
