import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Blob() {
  const mesh = useRef()
  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.12
    mesh.current.rotation.z = t * 0.05
    // gentle parallax toward the cursor
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, pointer.x * 0.6, 0.04)
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, pointer.y * 0.4, 0.04)
  })

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={mesh} scale={2.15}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color={'#0bd99a'}
          emissive={'#063b2c'}
          roughness={0.18}
          metalness={0.65}
          distort={0.42}
          speed={1.6}
          envMapIntensity={0.9}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const ref = useRef()
  const count = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    return isMobile ? 700 : 1800
  }, [])

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#7fe9d0" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function Scene() {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#aefff0" />
        <pointLight position={[-5, -3, -4]} intensity={1.4} color="#3a7bff" />
        <Blob />
        <ParticleField />
        <Sparkles count={40} scale={10} size={2} speed={0.3} color="#9bffe6" opacity={0.5} />
      </Canvas>
    </div>
  )
}
