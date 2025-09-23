'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import FryingPan from '@/components/FryingPan';
import RiceImage from '@/components/RiceImage';

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ progress }) => {
  const cameraRef = useRef();
  const [fryingPanScale, setFryingPanScale] = useState(5);
  const [riceScale, setRiceScale] = useState(1.75);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 0, 0);
      //console.log(cameraRef.current.position.toArray().map(v => +v.toFixed(2)));
    }
  });

  useLayoutEffect(() => {
    const updateScene = () => {
      const positions = [
        [0.01, 5.07, 0.71],   // 0: Start
        [-1, 0.5, 5],         // 1: Middle
        [-0.06, 0.22, 5.11],  // 2: Near end
        [3.65, -0.03, 3.58],  // 3: Final
      ];

      const clampedProgress = Math.min(progress, 0.999); // Prevent overflow
      const segmentProgress = 1 / (positions.length - 1);
      const segmentIndex = Math.floor(clampedProgress / segmentProgress);
      const percentage = (clampedProgress % segmentProgress) / segmentProgress;

      //console.log('Progress:', progress);
      //console.log('Segment index:', segmentIndex);
      //console.log('Percentage into segment:', percentage);

      // Handle camera position
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

      // Update scales based on segment
      const targetFryingPan = segmentIndex >= 2 ? 2.5 : 5;
      const targetRice = segmentIndex >= 2 ? 0.7 : 1.75;

      setFryingPanScale((prev) => {
        if (prev !== targetFryingPan) {
          console.log('fryingPanScale changed to:', targetFryingPan);
          return targetFryingPan;
        }
        return prev;
      });

      setRiceScale((prev) => {
        if (prev !== targetRice) {
          //console.log('riceScale changed to:', targetRice);
          return targetRice;
        }
        return prev;
      });
    };

    updateScene();
  }, [progress]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0.01, 5.07, 0.71]}
      />
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
      <RiceImage scale={riceScale} />
      <FryingPan scale={fryingPanScale} />
      <axesHelper args={[500]} />
    </>
  );
};

export default Scene;
