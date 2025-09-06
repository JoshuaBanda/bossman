'use client';
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

const FryingPan = forwardRef(({ scale = 1, position = [0, 0, 0] }, ref) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/fryingPan.glb');

  const [lastScale, setLastScale] = useState(scale);

  // Expose the internal group to parent ref
  useImperativeHandle(ref, () => groupRef.current);

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
});

export default FryingPan;
useGLTF.preload('/fryingPan.glb');
