
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'

function AnimatedControls() {
  const controlsRef = useRef()

  useEffect(() => {
    if (!controlsRef.current) return

    // Animate the camera to 80 degrees (in radians ≈ 1.396)
    gsap.to(controlsRef.current, {
      polarAngle: 1.396, // ~80 degrees
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => controlsRef.current.update()
    })
  }, [])

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      minPolarAngle={1.396}
      maxPolarAngle={1.396} // lock after animating
      enablePan={true}
    />
  )
}
