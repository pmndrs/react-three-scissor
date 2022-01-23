import React from 'react'
import { ScissorCanvas, ScissorWindow } from '@react-three/scissor'
import Cube from './Cube'
import styled from 'styled-components'

export default function App() {
  return (
    <>
      <ScissorCanvas
        gl={{
          antialias: true,
        }}
        camera={{
          position: [2, 2, 2],
        }}
      />

      <Grid>
        <StyledScissorWindow>
          <Cube color="red" speed={1} />
        </StyledScissorWindow>

        <StyledScissorWindow>
          <Cube color="cyan" speed={1} />
        </StyledScissorWindow>

        <StyledScissorWindow>
          <Cube color="yellow" speed={1} />
        </StyledScissorWindow>

        <StyledScissorWindow>
          <Cube color="pink" speed={1} />
        </StyledScissorWindow>
      </Grid>
    </>
  )
}

const Grid = styled.section`
  display: grid;
  grid-template-rows: 50vh 50vh;
  grid-template-columns: 50vw 50vw;
`

const StyledScissorWindow = styled(ScissorWindow)`
  width: 100%;
  height: 100%;
  border: 2px solid black;
`
