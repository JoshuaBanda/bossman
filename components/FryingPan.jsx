'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

export default function FryingPan({ scale,position }) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/fryingPan.glb');

  const [lastScale, setLastScale] = useState(scale);

  useEffect(() => {
    if (groupRef.current && scale !== lastScale) {
      console.log('Animating scale from', lastScale, 'to', scale);
      gsap.to(groupRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 1,
        ease: 'power2.out',
      });
      setLastScale(scale);
    }
  }, [scale, lastScale]);

  return (
    <group ref={groupRef} dispose={null} scale={[scale, scale, scale]} position={position}>
      <mesh
        geometry={nodes.ASSET.geometry}
        material={materials.ASSET_MAT_MR}
      />
    </group>
  );
}

useGLTF.preload('/fryingPan.glb');
