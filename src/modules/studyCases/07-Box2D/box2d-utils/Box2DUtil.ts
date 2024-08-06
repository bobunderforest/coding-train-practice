import * as b2 from '@box2d/core'
import { CoordinateTransformer } from './CoordinateTransformer'
import { CanvasUtil } from 'modules/canvas/canvas-util'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { B2dObject } from '../objects/B2dObject'

export type Renderable = {
  render(ctx: CanvasRenderingContext2D): void
}

export class Box2DUtil {
  coords: CoordinateTransformer
  world: b2.b2World
  groundBody: b2.b2Body

  grabMove: Vector | null = null
  isWheelPressed: boolean = false

  constructor(canvasUtil: CanvasUtil, args: { gravity?: b2.XY } = {}) {
    const { gravity = new b2.b2Vec2(0, -1) } = args
    this.world = b2.b2World.Create(gravity)
    this.coords = new CoordinateTransformer(canvasUtil, 8)
    this.groundBody = this.world.CreateBody({
      type: b2.b2BodyType.b2_staticBody,
      gravityScale: 0,
    })
  }

  applyWindKey(drawState: {
    figures: B2dObject[]
    keyboard: Record<string, boolean>
  }) {
    if (drawState.keyboard['Space']) {
      for (const f of drawState.figures) {
        f.applyForce({ x: 150, y: 0 })
      }
    }
  }

  stepAndRender(
    deltaTime: number,
    drawState: {
      figures: B2dObject[]
      staticFigures: Renderable[]
    },
    ctx: CanvasRenderingContext2D,
  ) {
    this.world.Step(deltaTime, {
      velocityIterations: 8,
      positionIterations: 3,
    })
    for (const f of [...drawState.figures, ...drawState.staticFigures]) {
      f.render(ctx)
    }
  }
}
