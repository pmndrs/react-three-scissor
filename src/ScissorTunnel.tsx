import React, { ReactElement, ReactNode, useLayoutEffect } from 'react'
import { Scene } from 'three'
import create, { SetState } from 'zustand'

type Props = { children: React.ReactNode }

interface iScissorTunnel {
  scenes: ReactNode[]
  addScene: (scene: ReactNode) => any
}

function tunnel() {
  const useStore = create<iScissorTunnel>((set) => ({
    scenes: [],
    addScene: (scene) => set((s) => ({ scenes: [...s.scenes, scene] })),
  }))

  return {
    Store: useStore,
    In: ({ children }: Props) => {
      const addScene = useStore((state) => state.addScene)
      useLayoutEffect(() => addScene(children), [])
      return null
    },
    Out: () => {
      const scenes = useStore((state) => state.scenes)
      return scenes as unknown as ReactElement
    },
  }
}

export default tunnel()
