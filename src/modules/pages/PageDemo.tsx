import { ComponentProps, useCallback, useRef } from 'react'
import { useUpdate } from 'react-use'
import { RenderArgs, CanvasAnimFrame } from 'modules/canvas/CanvasAnimFrame'
import { FullScreenCanvas } from 'modules/canvas/FullScreenCanvas'
import { DemoLayoutControls } from 'modules/ui/layout/DemoLayoutControls'

export type SetupArgs = {
  height: number
  width: number
}

type ControlsProps = ComponentProps<typeof DemoLayoutControls>

type Props<S> = ControlsProps & {
  canvasProps?: (args: {
    drawState: S
  }) => Partial<ComponentProps<typeof CanvasAnimFrame>>
  onRestart?: () => void
  render: (args: RenderArgs & { drawState: S }) => void
  setup?: (args: SetupArgs) => S
}

export function PageDemo<S extends {} = {}>({
  canvasProps,
  render,
  setup,
  ...controlProps
}: Props<S>) {
  const drawState = useRef<S | null>(null)
  const forceUpdate = useUpdate()
  const cp =
    canvasProps && drawState.current
      ? canvasProps({ drawState: drawState.current })
      : {}

  const handleClickRestart = useCallback(() => {
    drawState.current = null
  }, [])

  const renderWithSetup = useCallback(
    (args: RenderArgs) => {
      const { width, height } = args
      if (drawState.current === null) {
        drawState.current = setup ? setup({ width, height }) : ({} as S)
        forceUpdate()
      }
      render({ ...args, drawState: drawState.current })
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
