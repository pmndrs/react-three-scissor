import React, { useRef, useState } from 'react'
import { Box, useCursor, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import { BoxHelper, GridHelper, Object3D } from 'three'

interface CubeProps {
  color: string
  speed: number
}

export default function Cube({ color, speed = 1 }: CubeProps) {
  const ref = useRef<Object3D>()
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState<boolean>(false)

  useCursor(hovered, 'pointer', 'auto')

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01 * speed
      ref.current.rotation.y += 0.01 * speed
    }
  })

  const springs = useSpring({ scale: active ? 1.5 : 1 })

  return (
    <animated.group
      {...springs}
      onPointerDown={(e) => setActive((s) => !s)} //
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Box ref={ref}>
        <meshStandardMaterial color={color} />
      </Box>
    </animated.group>
  )
}
