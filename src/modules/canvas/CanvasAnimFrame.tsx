import useResizeObserver from 'use-resize-observer'
import { useEffect, useRef } from 'react'
import { CanvasUtil } from './canvas-util'

export type RenderArgs = {
  canvasUtil: CanvasUtil
}

export type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  setup?: (args: RenderArgs) => void
  render: (args: RenderArgs) => void
}

export function CanvasAnimFrame({
  setup,
  render,
  className,
  ...restProps
}: Props) {
  const { ref, width = -1, height = -1 } = useResizeObserver<HTMLDivElement>()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasUtilRef = useRef<CanvasUtil>(null)

  useEffect(() => {
    if (!canvasRef.current || width === -1 || height === -1) return
    const canvasUtil = new CanvasUtil({
      canvas: canvasRef.current,
    })

    canvasUtilRef.current = canvasUtil
    const unsubInit = setup && canvasUtil.eventInit.on(setup)
    const unsubRender = canvasUtil.eventRender.on(render)

    canvasUtil.initialize({ width, height })
    canvasUtil.enable()

    return () => {
      canvasUtil.disable()
      unsubInit?.()
      unsubRender()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  return (
    <div className={className} ref={ref}>
      <canvas
        ref={canvasRef}
        {...restProps}
        style={{
          display: 'block',
          height: '100%',
          width: '100%',
          ...(restProps.style ? restProps.style : {}),
        }}
      />
    </div>
  )
}
