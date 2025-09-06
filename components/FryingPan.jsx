'use client';
import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

const FryingPan = forwardRef(({ scale = 1, position = [0,0,0] }, ref) => {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/fryingPan.gltf');
  const [lastScale, setLastScale] = useState(scale);

  useImperativeHandle(ref, () => groupRef.current);

  useEffect(() => {
    if(groupRef.current && scale !== lastScale) {
      gsap.to(groupRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 1,
        ease: 'power2.out'
      });
      setLastScale(scale);
    }
  }, [scale, lastScale]);

  return (
    <group ref={groupRef} dispose={null} scale={[scale, scale, scale]} position={position}>
      <group position={[0, 0.369, 0]} scale={0.211}>
        <mesh geometry={nodes.Circle.geometry} material={materials['Handle metallic']} position={[4.269, -0.178, -1.952]} rotation={[-0.002, 0.431, -1.684]} scale={0.126} />
        <mesh geometry={nodes.Circle001.geometry} material={materials['Handle metallic']} position={[4.066, -0.178, -2.357]} rotation={[-0.002, 0.497, -1.684]} scale={0.126} />
        <group position={[0, -1.433, 0]} rotation={[0, 0.477, 0]} scale={4.74}>
          <mesh geometry={nodes.Circle_1.geometry} material={materials.Pan} />
          <mesh geometry={nodes.Circle_2.geometry} material={materials['Handle metallic']} />
        </group>
        <mesh geometry={nodes.Pan_main001.geometry} material={materials['Handle metallic']} position={[4.323, -0.157, -2.236]} rotation={[0, 0.471, 0]} scale={3.507} />
      </group>
    </group>
  );
});

export default FryingPan;
useGLTF.preload('/fryingPan.gltf');
