import * as b2 from '@box2d/core'
import { CoordinateTransformer } from './CoordinateTransformer'
import { CanvasUtil } from 'modules/canvas/canvas-util'
import { Vector } from 'modules/math/vectors/VectorMutable'

export class Box2DUtil {
  coords: CoordinateTransformer
  world: b2.b2World
  groundBody: b2.b2Body

  grabMove: Vector | null = null
  isWheelPressed: boolean = false

  constructor(canvasUtil: CanvasUtil) {
    const gravity = new b2.b2Vec2(0, -1)
    this.world = b2.b2World.Create(gravity)
    this.coords = new CoordinateTransformer(canvasUtil, 8)
    this.groundBody = this.world.CreateBody({
      type: b2.b2BodyType.b2_staticBody,
      gravityScale: 0,
    })
  }

  step(deltaTime: number) {
    this.world.Step(deltaTime, {
      velocityIterations: 8,
      positionIterations: 3,
    })
  }
}
