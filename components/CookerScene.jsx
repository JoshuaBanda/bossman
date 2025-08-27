'use client';

import Cooker from '@/components/Cooker';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React, { Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';
import FryingPan from './FryingPan';

//[-0.08, 1.76, 3.91] position 1
//[-0.27, 3.26, 2.78] 
//[-0.13, 4.25, 0.58]
const CameraLogger = ({ cameraRef }) => {
    useFrame(() => {
        if (cameraRef.current) {
            // Optional: Round values to avoid micro-noise
            console.log(cameraRef.current.position.toArray().map(v => +v.toFixed(2)));
        }
    });
    return null;
};

const CookerScene = ({ progress, storyTellingProgress=0 }) => {
    const cameraRef = useRef();






    useLayoutEffect(() => {

        if (typeof storyTellingProgress !== 'number') return;
        const positions = [
            [0.83, 3.96, 0.19],
            [2.98, 1.22, 2.47],
            [1.11, -0.28, 3.89],
            [0.04, -3.73, 1.6]
        ];

        //if (positions.length < 2 || !cameraRef.current) return;

        const clampedProgress = Math.min(storyTellingProgress, 0.999); // avoid overflow
        const segmentProgress = 1 / (positions.length - 1);
        const segmentIndex = Math.floor(clampedProgress / segmentProgress);
        const percentage = (clampedProgress % segmentProgress) / segmentProgress;

        //console.log('✔ storyTellingProgress:', storyTellingProgress.toFixed(3));
        //console.log('✔ Segment index:', segmentIndex);
        //console.log('✔ Percentage in segment:', percentage.toFixed(3));

        if (segmentIndex >= positions.length - 1) {
            const [x, y, z] = positions[positions.length - 1];
            gsap.to(cameraRef.current.position, {
                x, y, z,
                duration: 0.5,
                ease: 'power1.out',
            });
        } else {
            const [startX, startY, startZ] = positions[segmentIndex];
            const [endX, endY, endZ] = positions[segmentIndex + 1];

            const x = startX + (endX - startX) * percentage;
            const y = startY + (endY - startY) * percentage;
            const z = startZ + (endZ - startZ) * percentage;

            gsap.to(cameraRef.current.position, {
                x, y, z,
                duration: 0.5,
                ease: 'power1.out',
            });
        }
    }, [storyTellingProgress]);







    useLayoutEffect(() => {
        if (typeof progress !== 'number') return;
        const positions = [
            
            [0.01, 4.23, 0.71],
            [0.94, 4.11, 0.21],
            //[2.14, 2.7, 2.48],
            [2.64, 3.23, 0.07],
            //[0.41, 1.55, 3.83],
            //[0, 4.29, 0.18],
        ];

        //if (positions.length < 2 || !cameraRef.current) return;

        const clampedProgress = Math.min(progress, 0.999); // avoid overflow
        const segmentProgress = 1 / (positions.length - 1);
        const segmentIndex = Math.floor(clampedProgress / segmentProgress);
        const percentage = (clampedProgress % segmentProgress) / segmentProgress;

        //console.log('🔸 Progress:', progress.toFixed(3));
       // console.log('🔸 Segment index:', segmentIndex);
        //console.log('🔸 Percentage in segment:', percentage.toFixed(3));

        if (segmentIndex >= positions.length - 1) {
            const [x, y, z] = positions[positions.length - 1];
            gsap.to(cameraRef.current.position, {
                x, y, z,
                duration: 0.5,
                ease: 'power1.out',
            });
        } else {
            const [startX, startY, startZ] = positions[segmentIndex];
            const [endX, endY, endZ] = positions[segmentIndex + 1];

            const x = startX + (endX - startX) * percentage;
            const y = startY + (endY - startY) * percentage;
            const z = startZ + (endZ - startZ) * percentage;

            gsap.to(cameraRef.current.position, {
                x, y, z,
                duration: 0.5,
                ease: 'power1.out',
            });
        }
    }, [progress]);



return (
  <>
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0.83, 3.96, 0.19]}
    />

    <OrbitControls enableZoom={false} enableRotate={true} />
    <ambientLight intensity={1.5} />

    {/* Group the cooker and pan together */}
    <group>
      {/* Cooker at origin */}
      <Suspense fallback={null}>
        <Cooker />
      </Suspense>

      {/* Pan shifted up to sit on top */}
      <FryingPan scale={1.5} position={[0.23,0.72,0.12]}/> 
      {/* ↑ adjust Y (2.5) until it sits perfectly */}
    </group>

    <Environment preset="sunset" />
  </>
);

};

export default CookerScene;