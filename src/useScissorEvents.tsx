import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { DomEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import { Color, Object3D, Scene, Texture } from 'three'
import ScissorTunnel from './ScissorTunnel'

export default function useScissorEvents() {
  const events = useThree((state) => state.events)
  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)
  const gl = useThree((state) => state.gl)
  const size = useThree((state) => state.size)

  const scenes = ScissorTunnel.Store((s) => s.scenes)

  useEffect(() => {
    scene.children.forEach((child: Object3D) => {
      if (child.userData.__Scissor) {
        ;(child as Scene).environment = scene.environment as Texture
        ;(child as Scene).background = scene.background as Texture
      }
    })

    if (events.handlers) {
      for (const [key, handler] of Object.entries(events.handlers)) {
        const prevHandler = handler

        // @ts-ignore
        events.handlers![key] = (e: PointerEvent, state) => {
          scene.children.forEach((child: Object3D) => {
            if (child.userData.__Scissor) {
              const element = child.userData.__Scissor
              const rect = element.getBoundingClientRect()
              const { left, right, top, bottom, width, height } = rect

              if (
                e.clientX >= left && //
                e.clientX <= right &&
                e.clientY >= top &&
                e.clientY <= bottom
              ) {
                raycaster.filter = (e) => {
                  return e.filter((intersection) => child.getObjectById(intersection.object.id))
                }

                const prevSize = { ...size }
                raycaster.computeOffsets = (event: DomEvent, state) => {
                  state.size.height = height
                  state.size.width = width

                  return {
                    offsetX: event.offsetX - left, //
                    offsetY: event.offsetY - top,
                  }
                }

                size.height = prevSize.height
                size.width = prevSize.width

                prevHandler(e)
              }
            }
          })
        }
      }
    }
  }, [scenes, scene, events, gl, raycaster])
}
