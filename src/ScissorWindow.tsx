import React, { useLayoutEffect, useRef, useState } from 'react'
import ScissorTunnel from './ScissorTunnel'

export default function ScissorWindow({ children, ...rest }: React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>) {
  const [window, setWindow] = useState<HTMLDivElement>()
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => void (ref.current && setWindow(ref.current)), [])

  return (
    <>
      <div
        ref={ref}
        style={{
          width: '100%',
          height: '100%',
          ...rest.style,
        }}
        {...rest}
      />
      {window && (
        <ScissorTunnel.In>
          <scene userData={{ __Scissor: window }}>{children}</scene>
        </ScissorTunnel.In>
      )}
    </>
  )
}
