import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { random } from 'modules/math'

export abstract class B2dObject {
  b2dutil: Box2DUtil
  body: b2.b2Body
  fillColor: string
  strokeColor: string

  constructor(b2dutil: Box2DUtil, bodyDef: b2.b2BodyDef) {
    // Box 2d
    this.b2dutil = b2dutil
    this.body = b2dutil.world.CreateBody(bodyDef)

    // Colors
    this.fillColor = `rgb(${random(200, 255)}, ${random(200, 255)}, ${random(200, 255)})`
    this.strokeColor = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`
  }

  abstract render(ctx: CanvasRenderingContext2D): void
}
