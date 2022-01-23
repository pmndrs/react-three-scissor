import { Center, useCursor } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import React, { useState } from 'react'
import { MathUtils, Mesh } from 'three'

export default function Model({ mesh }: { mesh: Mesh }) {
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useCursor(hovered, 'pointer', 'auto')

  const springs = useSpring({ scale: active ? 1.5 : 1 })

  return (
    <a.group {...springs}>
      <gridHelper />
      <group
        scale={0.02}
        rotation-x={MathUtils.degToRad(90)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => setActive(!active)}
      >
        <Center>
          <mesh castShadow geometry={mesh.geometry}>
            <meshBasicMaterial vertexColors />
          </mesh>
        </Center>
      </group>
    </a.group>
  )
}
