'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import gsap from 'gsap';

const RiceImage = ({ scale }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, '/rice.png');
  const [lastScale, setLastScale] = useState(scale);

  useEffect(() => {
    if (meshRef.current && scale !== lastScale) {
      console.log('Animating rice scale from', lastScale, 'to', scale);

      // Animate scale
      gsap.to(meshRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 1,
        ease: 'power2.out',
      });

      // Animate Y position based on scale size
      const targetY = scale < lastScale ? 0.1 : 0.205;

      gsap.to(meshRef.current.position, {
        y: targetY,
        duration: 1,
        ease: 'power2.out',
      });

      setLastScale(scale);
    }
  }, [scale, lastScale]);

  return (
    <mesh
      ref={meshRef}
      position={[0, 0.205, 0]} // Initial Y
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[scale, scale, scale]}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

export default RiceImage;
