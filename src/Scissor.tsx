import React, { useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useLayoutEffect } from 'react'
import ScissorTunnel from './ScissorTunnel'
import useScissorEvents from './useScissorEvents'
import { Object3D } from 'three'

export default function Scissor() {
  const gl = useThree((s) => s.gl)

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
          camera.aspect = width / height
          camera.updateProjectionMatrix()

          gl.render(child, camera)
        }
      }
    })
  }, 1)

  useLayoutEffect(() => {
    if (gl.domElement.parentElement) {
      gl.domElement.parentElement.style.position = 'fixed'
      gl.domElement.parentElement.style.top = '0'
      gl.domElement.parentElement.style.left = '0'
      gl.domElement.parentElement.style.width = '100%'
      gl.domElement.parentElement.style.height = '100%'
    }
  }, [gl])

  return <ScissorTunnel.Out />
}
