import * as b2 from '@box2d/core'
import { CoordinateTransformer } from './CoordinateTransformer'
import { CanvasUtil } from 'modules/canvas/canvas-util'
import { Vector } from 'modules/math/vectors/VectorMutable'

export class Box2DUtil {
  coords: CoordinateTransformer
  world: b2.b2World

  grabMove: Vector | null = null
  isWheelPressed: boolean = false

  constructor(canvasUtil: CanvasUtil) {
    const gravity = new b2.b2Vec2(0, -9.8)
    this.world = b2.b2World.Create(gravity)
    this.coords = new CoordinateTransformer(canvasUtil, 1)
  }
}
