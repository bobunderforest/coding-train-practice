import { useEffect, useRef } from 'react'

const SCALE_RATIO =
  typeof window.devicePixelRatio === 'number' ? window.devicePixelRatio : 1

export type RenderArgs = {
  ctx: CanvasRenderingContext2D
  height: number
  prevTime: number
  time: number
  width: number
}

export type Props = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  render: (args: RenderArgs) => void
  width: number
  height: number
}

export function CanvasAnimFrame({
  render,
  width,
  height,
  ...restProps
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let rafID: number
    let prevTime: number = 0
    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
    ctx.imageSmoothingEnabled = true

    const renderFrame = (time: number) => {
      if (canvasRef.current && width && height) {
        ctx.save()
        if (SCALE_RATIO !== 1) ctx.scale(SCALE_RATIO, SCALE_RATIO)
        ctx.clearRect(0, 0, width, height)
        render({
          ctx,
          height,
          prevTime,
          time: time,
          width,
        })
        ctx.restore()
        prevTime = time
      }
      rafID = window.requestAnimationFrame(renderFrame)
    }

    rafID = window.requestAnimationFrame(renderFrame)

    return () => {
      cancelAnimationFrame(rafID)
    }
  }, [render, width, height])

  return (
    <canvas
      height={height * SCALE_RATIO || ''}
      width={width * SCALE_RATIO || ''}
      ref={canvasRef}
      {...restProps}
      style={{
        display: 'block',
        height: height || '100%',
        width: width || '100%',
        ...(restProps.style ? restProps.style : {}),
      }}
    />
  )
}
