import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

export default function Clothes(props) {
  const group = useRef(); // 🔹 Reference to the 3D group
  const { nodes, materials } = useGLTF('/Clothes.gltf');

  useEffect(() => {
    // 🔹 Simple animation: rotate the mesh on Y axis
    gsap.to(group.current.rotation, {
      y: -Math.PI / 2.5,
      duration: 10,
      repeat: 1,         // for infinite loop use -1
      ease: 'none',       // linear motion
    });

    // Optional: animate scale, position, etc.
    // gsap.to(group.current.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 2 });
  }, []);

  return (
    <group ref={group} {...props} dispose={null} scale={0.2}>
      <mesh
        geometry={nodes.Dress_pile_Dress_pile_u1_v1_0.geometry}
        material={materials.Dress_pile_u1_v1}
        rotation={[-Math.PI / 2.5, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/Clothes.gltf');
