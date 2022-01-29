import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scissor, ScissorWindow } from '@react-three/scissor'
import styled from 'styled-components'
import { Leva, useControls } from 'leva'

import { AnimatePresence, motion } from 'framer-motion'

import useMesh from './useMesh'
import Model from './Model'

const variants = {
  container: {
    hidden: {
      scale: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
    show: {
      scale: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: { scale: 0 },
    show: { scale: 1 },
  },
}

function Animals() {
  const { nMesh } = useControls({
    nMesh: {
      min: 1,
      max: 100,
      value: 1,
      label: 'Number of meshes',
    },
  })
  const meshes = useMesh(nMesh)

  return (
    <AnimatePresence>
      <Grid variants={variants.container} initial="hidden" animate="show" exit="hidden">
        {meshes.map((mesh, i) => (
          <GridCell key={i} variants={variants.item}>
            <StyledScissorWindow>
              <Model mesh={mesh} />
            </StyledScissorWindow>
          </GridCell>
        ))}
      </Grid>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <>
      <Copy>
        <main>
          <h1>react-three-scissor</h1>
          <p>Multiple scenes, one canvas! WebGL Scissoring implementation for React Three Fiber.</p>
          <Leva fill titleBar={false} />
        </main>
      </Copy>

      <Canvas camera={{ position: [4, 4, 4] }}>
        <Scissor />
      </Canvas>

      <Suspense fallback={null}>
        <Animals />
      </Suspense>
    </>
  )
}

const Copy = styled.section`
  width: 100%;
  text-align: center;
  font-family: 'Recursive', system-ui, sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 16px 32px;

  & > main {
    max-width: 600px;
  }

  h1 {
    font-style: italic;
  }

  p {
    font-weight: lighter;
    opacity: 40%;
  }
`

const Grid = styled(motion.section)`
  padding: 16px 32px;

  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  align-items: flex-start;
  justify-content: center;
`

const GridCell = styled(motion.div)`
  border: 1px solid black;
  border-radius: 5px;

  width: 200px;
  height: 200px;
`
const StyledScissorWindow = styled(ScissorWindow)`
  width: 100%;
  height: 100%;
`
