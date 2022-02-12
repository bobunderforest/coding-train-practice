import { ComponentProps, useCallback, useMemo, useRef } from 'react'
import { useUpdate } from 'react-use'
import { RenderArgs, CanvasAnimFrame } from 'modules/canvas/CanvasAnimFrame'
import { FullScreenCanvas } from 'modules/canvas/FullScreenCanvas'
import { DemoLayoutControls } from 'modules/ui/layout/DemoLayoutControls'
import { Vector } from 'modules/math/vectors/VectorMutable'

export type SetupArgs = {
  height: number
  width: number
}

type ControlsProps = ComponentProps<typeof DemoLayoutControls>

type StateWithDefaults<S> = S & {
  mouse?: Vector
  isMousePressed: boolean
}

type Props<SP, S = StateWithDefaults<SP>> = ControlsProps & {
  canvasProps?: (args: {
    drawState: S
  }) => Partial<ComponentProps<typeof CanvasAnimFrame>>
  onRestart?: () => void
  render: (args: RenderArgs & { drawState: S }) => void
  setup: (args: SetupArgs) => SP
  removeMouseOnOut?: boolean
}

export function PageDemo<SP extends {} = {}>({
  canvasProps = () => ({}),
  render,
  setup,
  removeMouseOnOut,
  ...controlProps
}: Props<SP>) {
  type S = StateWithDefaults<SP>

  const drawState = useRef<S | null>(null)
  const forceUpdate = useUpdate()

  const cp = useMemo(() => {
    if (!drawState.current) return {}

    const gotenProps = canvasProps({ drawState: drawState.current })
    const defaultProps = {
      onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawState.current) return
        if (drawState.current.mouse) {
          drawState.current.mouse.x = e.pageX
          drawState.current.mouse.y = e.pageY
        } else {
          drawState.current.mouse = new Vector(e.pageX, e.pageY)
        }
        gotenProps.onMouseMove?.(e)
      },
      onMouseOut: (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawState.current) return
        if (removeMouseOnOut) {
          drawState.current.mouse = undefined
        }
        gotenProps.onMouseOut?.(e)
      },
      onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawState.current) return
        drawState.current.isMousePressed = true
        gotenProps.onMouseDown?.(e)
      },
      onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawState.current) return
        drawState.current.isMousePressed = false
        gotenProps.onMouseUp?.(e)
      },
    }

    return {
      ...defaultProps,
      ...gotenProps,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeMouseOnOut, canvasProps, drawState.current])

  const handleClickRestart = useCallback(() => {
    drawState.current = null
  }, [])

  const renderWithSetup = useCallback(
    (args: RenderArgs) => {
      const { width, height } = args
      if (drawState.current === null) {
        drawState.current = {
          mouse: undefined,
          isMousePressed: false,
          ...setup({ width, height }),
        }
        forceUpdate()
      }
      render({
        ...args,
        drawState: drawState.current,
      })
    },
    [render, setup, forceUpdate],
  )

  return (
    <>
      <DemoLayoutControls
        {...controlProps}
        onClickRestart={handleClickRestart}
      />
      <FullScreenCanvas {...cp} render={renderWithSetup} />
    </>
  )
}
