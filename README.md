<br />

<h1 align="center">react-three-scissor</h1>
<h3 align="center">Multiple scenes, one canvas! WebGL Scissoring implementation for React Three Fiber.</h3>

<br>

<p align="center">
  <h1 align="center">Depricated! Use <a href="https://github.com/pmndrs/drei#view"><code>&lt;View /&gt;</code></a> from <code>react-three-drei</code></h1>
</p>

<br>

<details>
<summary>Show depricated readme</summary>

`scissor` lets you render an infinite number of individual scenes (limited by your processing capability of course) on one single WebGL context and canvas.

It is as easy as:

```jsx
<Canvas>
  // Add Scissored components to the canvas
  <Scissor />
</Canvas>

// Define sissor windows.
<ScissorWindow>
    <Cube color="red" />
</ScissorWindow>

<ScissorWindow>
    <Cube color="blue" />
</ScissorWindow>

// ... Any number of windows
```

## Why this?

Havigng multiple WebGL contests within one webpage is generally a bad idea because (from [ThreeJS manual](https://threejs.org/manual/?q=mul#en/multiple-scenes)):

- **The browser limits how many WebGL contexts you can have.** Typically that limit is around 8 of them. After which, the oldest ones lose context.
- **WebGL resources can not be shared across contexts.** That means expensive operation like loading models and compiling shaders would have to be repeated.

Instead, we create the illusion of multiple canvases by having one large one and drawing on very speciifc parts of it. This process is called Scissoring.

## Getting Started

### ⚡️ Jump Start

```shell
# Install the entire library
npm install @react-three/scissor
```

```jsx
import { Box } from '@react-three/drei'
import { Scissor, ScissorWindow } from '@react-three/scissor'

export default function App() {
  return (
    <>
      <Canvas>
        <Scissor />
      </Canvas>

      <div>
        <ScissorWindow>
          <Box>
            <meshStandardMaterial color={'cyan'} />
          </Box>
        </ScissorWindow>

        <ScissorWindow>{/* Any R3F Components */}</ScissorWindow>
      </div>
    </>
  )
}
```

It's as simple as that to create scroll-in animations.

### 💅 Styling Windows

### CSS

`ScissorWindow` can be styled, positioned and scaled with any CSS property.

```jsx
<ScissorWindow
    className="window"
    style={{
        ...
    }}
>
    {/* Any R3F Components */}
</ScissorWindow>
```

Or,

```css
.window {
  width: 420px;
  height: 420px;
  border: 2px solid black;

  position: absolute;
  top: 0;
  ...;
}
```

### Styled components

It can also be wrapped in `styled-component` definitions like so:

```js
const StyledScissorWindow = styled(ScissorWindow)`
  width: 420px;
  height: 420px;
  border: 2px solid black;

  position: absolute;
  top: 0;
  ...
`
```

## Roadmap

Major TODOs

- [ ] Controls support
- [ ] `<Environment />` support
- [ ] Other Drei helpers support
- [ ] Per-window camera

</details>
