"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FryingPan from "@/components/FryingPan";
import RiceImage from "@/components/RiceImage";

gsap.registerPlugin(ScrollTrigger);


const CameraLogger = ({ cameraRef }) => {
    useFrame(() => {
        if (cameraRef.current) {
            // Optional: Round values to avoid micro-noise
            console.log(cameraRef.current.position.toArray().map(v => +v.toFixed(2)));
        }
    });
    return null;
};
const Scene = ({ progress }) => {
  const cameraRef = useRef();
  const [fryingPanScale, setFryingPanScale] = useState(2.5);
  const [riceScale, setRiceScale] = useState(1.75);

  // Keep camera looking at center
  useFrame(() => {
    if (cameraRef.current) cameraRef.current.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => {
    const updateScene = () => {
      const positions = [
        [0.2, 8.12, 0.01],
[-0.09, 8.67, 2.32],
[-0.09, 8.67, 2.32]
      ];

      const clampedProgress = Math.min(progress, 0.999); // Prevent overflow
      const segmentProgress = 1 / (positions.length - 1);
      let segmentIndex = Math.floor(clampedProgress / segmentProgress);
      segmentIndex = Math.min(segmentIndex, positions.length - 2); // Safe clamp

      const percentage = (clampedProgress % segmentProgress) / segmentProgress;

      if (positions[segmentIndex] && positions[segmentIndex + 1]) {
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
          ease: "power1.out",
        });
      }

      // Scale logic for frying pan and rice
      //console.log(segmentIndex);
      const targetFryingPan = segmentIndex >= 2 ? 2.5 : 2.5;
      const targetRice = segmentIndex >= 2 ? 0.7 : 1.75;

      setFryingPanScale((prev) => (prev !== targetFryingPan ? targetFryingPan : prev));
      setRiceScale((prev) => (prev !== targetRice ? targetRice : prev));
    };

    updateScene();
  }, [progress]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0.2, 8.12, 0.01]}
      />
       {/*<CameraLogger cameraRef={cameraRef} />*/}
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
      {/*<RiceImage scale={riceScale} />*/}
      <FryingPan scale={fryingPanScale} />
      <axesHelper args={[500]} />
    </>
  );
};

export default Scene;
