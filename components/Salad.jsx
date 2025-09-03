'use client';
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

const Salad = forwardRef(({ position = [0, 0, 0], scale = 1, ...props }, ref) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/Salad.gltf');
  const [lastScale, setLastScale] = useState(scale);

  // expose the internal group to parent
  useImperativeHandle(ref, () => groupRef.current);

  useEffect(() => {
    if (groupRef.current && scale !== lastScale) {
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
    <group ref={groupRef} {...props} dispose={null} position={position} scale={[scale, scale, scale]}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.main}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

export default Salad;
useGLTF.preload('/Salad.gltf');
