import React from 'react'
import { Canvas, Props, useFrame } from '@react-three/fiber'
import ScissorTunnel from './ScissorTunnel'
import useScissorEvents from './useScissorEvents'
import { Object3D } from 'three'

function ScissorRenderer() {
  useScissorEvents()
  useFrame((state) => {
    const { gl, camera } = state

    gl.setScissorTest(false)
    gl.clear(true, true)
    gl.setScissorTest(true)

    const children = state.scene.children

    children.forEach((child: Object3D) => {
      if (child.userData.__Scissor) {
        // console.log(child.userData.__Scissor);
        const element = child.userData.__Scissor as HTMLDivElement
        const rect = element.getBoundingClientRect()
        const { left, right, top, bottom, width, height } = rect

        const isOffscreen =
          bottom < 0 || top > gl.domElement.clientHeight || right < 0 || left > gl.domElement.clientWidth

        if (!isOffscreen) {
          const positiveYUpBottom = gl.domElement.clientHeight - bottom
          gl.setScissor(left, positiveYUpBottom, width, height)
          gl.setViewport(left, positiveYUpBottom, width, height)

          // @ts-ignore
          camera.aspect = rect.width / rect.height
          // @ts-ignore
          camera.updateProjectionMatrix()

          gl.render(child, camera)
        }
      }
    })
  }, 1)

  // @ts-ignore
  return <ScissorTunnel.Out />
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export default function ScissorCanvas({ children, ...rest }: PartialBy<Props, 'children'>) {
  return (
    <Canvas
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        display: 'block',
        ...rest.style,
      }}
      {...rest}
    >
      {children}
      <ScissorRenderer />
    </Canvas>
  )
}
