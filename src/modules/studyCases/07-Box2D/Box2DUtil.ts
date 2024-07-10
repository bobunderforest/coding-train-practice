import * as b2 from '@box2d/core'
import { CoordinateTransformer } from './CoordinateTransformer'
import { CanvasUtil } from 'modules/canvas/canvas-util'
import { Vector } from 'modules/math/vectors/VectorMutable'
import type {
  StateWithDefaults,
  CanvasComponentProps,
} from 'modules/pages/PageDemo'

type DrawStateForPatch = StateWithDefaults<{
  b2dutil: Box2DUtil
}>

export class Box2DUtil {
  coords: CoordinateTransformer
  world: b2.b2World

  grabMove: Vector | null = null
  isWheelPressed: boolean = false

  constructor(canvasUtil: CanvasUtil) {
    const gravity = new b2.b2Vec2(0, -9.8)
    this.world = b2.b2World.Create(gravity)
    this.coords = new CoordinateTransformer(canvasUtil, 2)
  }

  static GetPropsPatchedWithControls(props: CanvasComponentProps) {
    return <DrawState extends DrawStateForPatch>({
      drawState,
    }: {
      drawState: DrawState
    }) => {
      return {
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
}
