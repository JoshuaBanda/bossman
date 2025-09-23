'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import Salad from './Salad';

const ProcedureScene = ({ progress = 0 }) => {
  const cameraRef = useRef();
  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  useLayoutEffect(() => {
    const updateScene = () => {
      const positions = [
        [0.01, 5.07, 0.71],
        [-0.95, 2.05, 4.58],
        [1.81, 4.45, 1.67],
        [-0.95, 2.05, 4.58]
      ];

      const clampedProgress = Math.min(progress, 0.999);
      const segmentProgress = 1 / (positions.length - 1);
      const segmentIndex = Math.floor(clampedProgress / segmentProgress);
      const percentage = (clampedProgress % segmentProgress) / segmentProgress;

      if (segmentIndex >= positions.length - 1) {
        const [x, y, z] = positions[positions.length - 1];
        gsap.to(cameraRef.current.position, {
          x,
          y,
          z,
          duration: 1.5,
          ease: 'power1.out',
        });
      } else {
        const [startX, startY, startZ] = positions[segmentIndex];
        const [endX, endY, endZ] = positions[segmentIndex + 1];

        const x = startX + (endX - startX) * percentage;
        const y = startY + (endY - startY) * percentage;
        const z = startZ + (endZ - startZ) * percentage;

        gsap.to(cameraRef.current.position, {
          x,
          y,
          z,
          duration: 0.5,
          ease: 'power1.out',
        });
      }
    };

    updateScene();
  }, [progress]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[-0.95, 2.05, 4.58]}
      />
      
            <Environment files="/venice_sunset_1k.hdr" />
      <Salad scale={5} />

      {/* Logger for camera */}
    </>
  );
};

export default ProcedureScene;
