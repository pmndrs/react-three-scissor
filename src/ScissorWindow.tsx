import React, { useLayoutEffect, useRef, useState } from 'react'
import ScissorTunnel from './ScissorTunnel'

export default function ScissorWindow({ children, ...rest }: React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>) {
  const [win, setWindow] = useState<HTMLDivElement>()
  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => void (ref.current && setWindow(ref.current)), [])

  return (
    <>
      <div ref={ref} {...rest} />
      {win && (
        <ScissorTunnel.In>
          <scene userData={{ __Scissor: win }}>{children}</scene>
        </ScissorTunnel.In>
      )}
    </>
  )
}
