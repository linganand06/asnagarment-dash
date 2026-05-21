import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Stars, useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition } from '../../hooks/useMousePosition'

/* ---- Fabric Wave ---- */
const FabricWave = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => new THREE.PlaneGeometry(30, 30, 60, 60), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime * 0.4
    const positions = geo.attributes.position.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      positions[i + 2] =
        Math.sin(x * 0.8 + time) * 0.6 +
        Math.cos(y * 0.6 + time * 0.7) * 0.4 +
        Math.sin((x + y) * 0.5 + time * 1.1) * 0.3
    }
    geo.attributes.position.needsUpdate = true
    geo.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} geometry={geo} rotation={[-Math.PI / 2.5, 0, 0.3]} position={[0, -4, -8]}>
      <meshStandardMaterial
        color="#0A0A1F"
        wireframe
        transparent
        opacity={0.25}
        emissive="#0030FF"
        emissiveIntensity={0.08}
      />
    </mesh>
  )
}

/* ---- Particle Field ---- */
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 1200

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3]     = (Math.random() - 0.5) * 40
      pos[i3 + 1] = (Math.random() - 0.5) * 30
      pos[i3 + 2] = (Math.random() - 0.5) * 20

      const t = Math.random()
      if (t < 0.5) {
        col[i3] = 0; col[i3 + 1] = 0.94; col[i3 + 2] = 1    // blue
      } else if (t < 0.8) {
        col[i3] = 0.54; col[i3 + 1] = 0.36; col[i3 + 2] = 0.96  // purple
      } else {
        col[i3] = 1; col[i3 + 1] = 1; col[i3 + 2] = 1  // white
      }
    }
    return [pos, col]
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    const time = state.clock.elapsedTime * 0.1
    particlesRef.current.rotation.y = time * 0.05
    particlesRef.current.rotation.x = Math.sin(time * 0.3) * 0.05
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ---- Custom 3D Model ---- */
const TShirtMesh = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  // This looks for 'tshirt.glb' inside the public/models/ folder
  const { scene } = useGLTF('/models/tshirt.glb')

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime
    // Continuous 360-degree rotation on the Y-axis
    groupRef.current.rotation.y = time * 0.5
    // Keep the gentle floating up and down
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.15
    // Very slight tilt
    groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.02
  })

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={5.5}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  )
}

// Preload to ensure smooth loading
useGLTF.preload('/models/tshirt.glb')

/* ---- Floating Orbs ---- */
const FloatingOrbs = () => {
  const orbsData = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      scale: 0.05 + Math.random() * 0.18,
      color: i % 3 === 0 ? '#00F0FF' : i % 3 === 1 ? '#8B5CF6' : '#C0C0C0',
      speed: 0.3 + Math.random() * 0.7,
      offset: Math.random() * Math.PI * 2,
    })), []
  )

  return (
    <>
      {orbsData.map((orb) => (
        <FloatingOrb key={orb.id} {...orb} />
      ))}
    </>
  )
}

const FloatingOrb = ({
  position, scale, color, speed, offset,
}: {
  position: [number, number, number]
  scale: number
  color: string
  speed: number
  offset: number
}) => {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.position.y = position[1] + Math.sin(t) * 0.4
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.2
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

/* ---- Mouse Light ---- */
const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null)
  const { normalizedX, normalizedY } = useMousePosition()

  useFrame(() => {
    if (!lightRef.current) return
    lightRef.current.position.x += (normalizedX * 8 - lightRef.current.position.x) * 0.06
    lightRef.current.position.y += (normalizedY * 5 - lightRef.current.position.y) * 0.06
  })

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 4]}
      color="#00F0FF"
      intensity={3}
      distance={20}
      decay={2}
    />
  )
}

/* ---- Main Scene ---- */
export const HeroScene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#0A0A20" />
      
      {/* Soft Fill Light */}
      <directionalLight position={[0, 5, 5]} intensity={1.5} color="#FFFFFF" />
      
      {/* Neon Pink Light (Left) */}
      <pointLight position={[-5, 2, 4]} color="#FF007F" intensity={8} distance={20} decay={2} />
      
      {/* Neon Cyan Light (Right) */}
      <pointLight position={[5, -1, 4]} color="#00F0FF" intensity={8} distance={20} decay={2} />
      
      {/* Rim Light (Back/Top) for premium glow */}
      <spotLight position={[0, 8, -2]} color="#FFFFFF" intensity={5} angle={0.5} penumbra={1} />
      
      <MouseLight />

      {/* 3D Elements */}
      <FabricWave />
      <ParticleField />
      <TShirtMesh />
      <FloatingOrbs />

      {/* Stars */}
      <Stars
        radius={60}
        depth={50}
        count={800}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />
    </>
  )
}
