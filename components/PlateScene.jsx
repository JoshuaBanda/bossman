'use client';

import Cooker from '@/components/Cooker';
import { Environment, OrbitControls, PerspectiveCamera, useProgress } from '@react-three/drei';
import React, { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import FryingPan from './FryingPan';
import Salad from './Salad';
import ObjectLogger from './OnjectLogger';
import { useFrame } from '@react-three/fiber';
import MobileCooker from './MobileCooker';


const PlateScene = ({ progress=0, storyTellingProgress = 0, loadingProgress,onFallback }) => {

  const cameraRef = useRef();
  const cookerRef = useRef();
  const panRef = useRef();
  const saladRef = useRef();

  // Initial & target positions
  const initialPositions = {
    salad: [-0.2, 0.69, -0.35],
    pan: [0.23, 0.72, 0.12],
    cooker: [0, -2, 0],
  };

  const targetPositions = {
    salad: [0.275, 1.5, -0.2],
    pan: [0, 1, -0.3],
    cooker: [0, 0, 0.],
  };
  useLayoutEffect(() => {
    if (typeof storyTellingProgress !== "number") return;
    if (!saladRef.current || !panRef.current || !cookerRef.current) return;

    const clamp = (v) => Math.min(Math.max(v, 0), 1);
    const t = clamp(storyTellingProgress);

    const lerp = (a, b, t) => a + (b - a) * t;

    // Salad
    gsap.to(saladRef.current.position, {
      x: lerp(initialPositions.salad[0], targetPositions.salad[0], t),
      y: lerp(initialPositions.salad[1], targetPositions.salad[1], t),
      z: lerp(initialPositions.salad[2], targetPositions.salad[2], t),
      duration: 0.5,
      ease: "power2.out",
    });

    // Pan
    gsap.to(panRef.current.position, {
      x: lerp(initialPositions.pan[0], targetPositions.pan[0], t),
      y: lerp(initialPositions.pan[1], targetPositions.pan[1], t),
      z: lerp(initialPositions.pan[2], targetPositions.pan[2], t),
      duration: 0.5,
      ease: "power2.out",
    });

    // Cooker
    gsap.to(cookerRef.current.position, {
      x: lerp(initialPositions.cooker[0], targetPositions.cooker[0], t),
      y: lerp(initialPositions.cooker[1], targetPositions.cooker[1], t),
      z: lerp(initialPositions.cooker[2], targetPositions.cooker[2], t),
      duration: 0.5,
      ease: "power2.out",
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




const { progress: loaderProgress, active } = useProgress();
const doneRef = useRef(false);
const fallbackLoggedRef = useRef(false);
const [timeoutReached, setTimeoutReached] = React.useState(false);


// run fallback timeout once
useEffect(() => {
  // only if loading is still active
  if (doneRef.current) return;

  const timeout = setTimeout(() => {
    // mark fallback reached
    setTimeoutReached(true);

    // finish loading if not done
    if (!doneRef.current) {
      loadingProgress(1);
      doneRef.current = true;
    }
  }, 15000);

  return () => clearTimeout(timeout);
}, []); // <- only run once per mount

// log fallback exactly once
  useEffect(() => {
    if (timeoutReached && !fallbackLoggedRef.current) {
      fallbackLoggedRef.current = true;
      console.log("fallback.........."); // child log
      if (onFallback) onFallback(); // call parent function
    }
  }, [timeoutReached, onFallback]);


useFrame(() => {
  if (doneRef.current) return;

  if (active) {
    loadingProgress(loaderProgress / 100);
  } else {
    loadingProgress(1);
    doneRef.current = true;
  }
});


  //console.log('progress:',progress,'loadingprogress:',loaderProgress);
  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0.83, 3.96, 0.19]} />
      <OrbitControls enableZoom={false} enableRotate={true} />
      <ambientLight intensity={1.5} />

      <group>
        <Suspense fallback={null}>
          <MobileCooker ref={cookerRef}/>
        </Suspense>
        <Suspense fallback={null}>
          <FryingPan ref={panRef} scale={0.2} position={initialPositions.pan} />
        </Suspense>
        <Suspense fallback={null}>
          <Salad ref={saladRef} position={initialPositions.salad} scale={1.3} />
        </Suspense>
      </group>

      {/*<ObjectLogger targetRef={saladRef} label="Salad" />*/}
      <Environment preset="sunset" />
    </>
  );
};

export default PlateScene;
