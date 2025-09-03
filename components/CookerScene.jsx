'use client';

import Cooker from '@/components/Cooker';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React, { Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import FryingPan from './FryingPan';
import Salad from './Salad';
import ObjectLogger from './OnjectLogger';


const CookerScene = ({ progress, storyTellingProgress = 0 }) => {
  const cameraRef = useRef();
  const cookerRef = useRef();
  const panRef = useRef();
  const saladRef = useRef();

  // Initial & target positions
  const initialPositions = {
    salad: [-0.2, 0.69, -0.35],
    pan: [0.23, 0.72, 0.12],
    cooker: [0,0,0],
  };

  const targetPositions = {
    salad: [0.275, 1.5, -0.2],
    pan: [0, 1, -0.3],
    cooker: [0, -0.8, 0.],
  };

  useLayoutEffect(() => {
    if (typeof storyTellingProgress !== 'number') return;

    const clamp = (v) => Math.min(Math.max(v, 0), 1);
    const t = clamp(storyTellingProgress); // normalize 0 → 1

    const lerp = (a, b, t) => a + (b - a) * t;

    // Salad
    gsap.to(saladRef.current.position, {
      x: lerp(initialPositions.salad[0], targetPositions.salad[0], t),
      y: lerp(initialPositions.salad[1], targetPositions.salad[1], t),
      z: lerp(initialPositions.salad[2], targetPositions.salad[2], t),
      duration: 0.5,
      ease: 'power2.out',
    });

    // Pan
    gsap.to(panRef.current.position, {
      x: lerp(initialPositions.pan[0], targetPositions.pan[0], t),
      y: lerp(initialPositions.pan[1], targetPositions.pan[1], t),
      z: lerp(initialPositions.pan[2], targetPositions.pan[2], t),
      duration: 0.5,
      ease: 'power2.out',
    });

    // Cooker
    gsap.to(cookerRef.current.position, {
      x: lerp(initialPositions.cooker[0], targetPositions.cooker[0], t),
      y: lerp(initialPositions.cooker[1], targetPositions.cooker[1], t),
      z: lerp(initialPositions.cooker[2], targetPositions.cooker[2], t),
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [storyTellingProgress]);

  // Camera interpolation from storyTellingProgress
  useLayoutEffect(() => {
    if (typeof storyTellingProgress !== 'number') return;
    const positions = [
      
      [2.64, 3.23, 0.07],
      [2.98, 1.22, 2.47],
      [2.98, 1.22, 2.47],
    ];

    const clamped = Math.min(storyTellingProgress, 0.999);
    const segProgress = 1 / (positions.length - 1);
    const segIndex = Math.floor(clamped / segProgress);
    const pct = (clamped % segProgress) / segProgress;

    const [startX, startY, startZ] = positions[segIndex];
    const [endX, endY, endZ] = positions[Math.min(segIndex + 1, positions.length - 1)];

    gsap.to(cameraRef.current.position, {
      x: startX + (endX - startX) * pct,
      y: startY + (endY - startY) * pct,
      z: startZ + (endZ - startZ) * pct,
      duration: 0.5,
      ease: 'power1.out',
    });
  }, [storyTellingProgress]);

  // Camera interpolation from progress
  useLayoutEffect(() => {
    if (typeof progress !== 'number') return;
    const positions = [
      [0.01, 4.23, 0.71],
      [0.94, 4.11, 0.21],
      [2.64, 3.23, 0.07],
    ];

    const clamped = Math.min(progress, 0.999);
    const segProgress = 1 / (positions.length - 1);
    const segIndex = Math.floor(clamped / segProgress);
    const pct = (clamped % segProgress) / segProgress;

    const [startX, startY, startZ] = positions[segIndex];
    const [endX, endY, endZ] = positions[Math.min(segIndex + 1, positions.length - 1)];

    gsap.to(cameraRef.current.position, {
      x: startX + (endX - startX) * pct,
      y: startY + (endY - startY) * pct,
      z: startZ + (endZ - startZ) * pct,
      duration: 0.5,
      ease: 'power1.out',
    });
  }, [progress]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0.83, 3.96, 0.19]} />
      <OrbitControls enableZoom={false} enableRotate={true} />
      <ambientLight intensity={1.5} />

      <group ref={cookerRef}>
        <Suspense fallback={null}>
          <Cooker />
        </Suspense>
        <FryingPan ref={panRef} scale={1.5} position={initialPositions.pan} />
        <Salad ref={saladRef} position={initialPositions.salad} scale={1.3} />
      </group>

{/*<ObjectLogger targetRef={saladRef} label="Salad" />*/}
      <Environment preset="sunset" />
    </>
  );
};

export default CookerScene;
