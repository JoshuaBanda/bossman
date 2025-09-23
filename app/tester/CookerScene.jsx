'use client';

import Cooker from '@/components/Cooker';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React, { Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';

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
            //[0.36, 1.33, 3.94]
            [-0.03, 0.2, 4.05],
            [3.4, 0.97, 2.32],
            //[-0.27, 3.26, 2.78],
            [-0.13, 4.25, 0.58],
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
                position={[0.01, 4.23, 0.71]}
            />

            <OrbitControls enableZoom={false} enableRotate={true} />
            <ambientLight intensity={1.5} />

       {/* <CameraLogger cameraRef={cameraRef} />*/}
            <Suspense fallback={null}>
                <Cooker />
            </Suspense>

            {/*<axesHelper args={[500]} />*/}
            <Environment preset="sunset" />
        </>
    );
};

export default CookerScene;
