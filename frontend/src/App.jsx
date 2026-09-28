import React from 'react';
import { Viewer, Entity, PointGraphics, CameraFlyTo } from "resium";
import { Cartesian3, Color } from "cesium";

// Static drone data for Week 1 positioned around a central point
const DRONE_DATA = [
  { id: 'drone-1', position: Cartesian3.fromDegrees(-122.4, 37.74, 500) },
  { id: 'drone-2', position: Cartesian3.fromDegrees(-122.41, 37.73, 800) },
  { id: 'drone-3', position: Cartesian3.fromDegrees(-122.39, 37.75, 400) }
];

export default function App() {
  return (
    <Viewer full animation={false} timeline={false} infoBox={true}>
      {/* Move camera to look at the drones on the 3D Earth on load */}
      <CameraFlyTo 
        destination={Cartesian3.fromDegrees(-122.4, 37.74, 15000)} 
        duration={3}
      />
      
      {DRONE_DATA.map(drone => (
        <Entity
          key={drone.id}
          position={drone.position}
          name={drone.id}
          description={`Static drone marker for ${drone.id} holding position.`}
        >
          <PointGraphics 
            pixelSize={15} 
            color={Color.ORANGE} 
            outlineColor={Color.BLACK} 
            outlineWidth={2} 
          />
        </Entity>
      ))}
    </Viewer>
  );
}
