import { Vector } from 'modules/math/vectors/VectorMutable'
import type { GetCanvasProps, StateWithDefaults } from 'modules/pages/PageDemo'
import type { Box2DUtil } from './Box2DUtil'
import type { CanvasUtil } from 'modules/canvas/canvas-util'

type DrawStateForPatch = StateWithDefaults<{
  b2dutil: Box2DUtil
}>

/**
 * Camera control handlers
 */
export function getCanvasPropsPatchedWithControls<
  DrawState extends object = object,
  DrawStateFull extends DrawState & DrawStateForPatch = DrawState &
    DrawStateForPatch,
>(getProps: GetCanvasProps<DrawStateFull>) {
  return (args: { canvasUtil: CanvasUtil; drawState: DrawStateFull }) => {
    const { drawState } = args
    const props = getProps(args)
    return {
      ...props,
      onWheelCapture: (e: React.WheelEvent<HTMLCanvasElement>) => {
        const {
          b2dutil: { coords },
        } = drawState
        const zoom = Math.max(
          coords.getZoom() - coords.getZoom() * 0.065 * Math.sign(e.deltaY),
          0.01,
        )
        coords.setZoom(zoom)
        props.onWheelCapture?.(e)
      },
      onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (e.button === 1) {
          drawState.b2dutil.isWheelPressed = true
        }
        props.onMouseDown?.(e)
      },
      onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => {
        drawState.b2dutil.isWheelPressed = false
        props.onMouseUp?.(e)
      },
      onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { mouse, b2dutil } = drawState
        const { coords, isWheelPressed, grabMove } = b2dutil

        if ((e.shiftKey || isWheelPressed) && !grabMove && mouse) {
          b2dutil.grabMove = mouse.copy()
        } else if (!(e.shiftKey || isWheelPressed) && grabMove) {
          b2dutil.grabMove = null
        }

        if (b2dutil.grabMove instanceof Vector) {
          const zoom = coords.getZoom()
          const prevOffset = coords.getOffset()
          const newOffset = {
            x: prevOffset.x + (b2dutil.grabMove.x - e.clientX) / zoom,
            y: prevOffset.y + ((b2dutil.grabMove.y - e.clientY) / zoom) * -1,
          }
          coords.setOffset(newOffset)
          if (drawState.mouse) b2dutil.grabMove = drawState.mouse.copy()
        }
        props.onMouseMove?.(e)
      },
    }
  }
}
