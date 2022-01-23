import React, { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { DomEvent } from '@react-three/fiber/dist/declarations/src/core/events'
import { Object3D } from 'three'

export default function useScissorEvents() {
  const events = useThree((state) => state.events)
  const raycaster = useThree((state) => state.raycaster)
  const scene = useThree((state) => state.scene)
  const gl = useThree((state) => state.gl)
  const size = useThree((state) => state.size)

  useEffect(() => {
    if (events.handlers) {
      for (const [key, handler] of Object.entries(events.handlers)) {
        const prevHandler = handler

        // @ts-ignore
        events.handlers![key] = (e: PointerEvent) => {
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
  }, [scene, events, size, gl, raycaster])
}
