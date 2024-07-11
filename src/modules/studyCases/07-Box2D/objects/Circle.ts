import * as b2 from '@box2d/core'
import { random } from 'modules/math'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { renderCircle } from '../renderers/render-circle'

export class Circle {
  b2dutil: Box2DUtil
  fillColor: string
  strokeColor: string
  body: b2.b2Body

  constructor(b2dutil: Box2DUtil, bodyDef: b2.b2BodyDef) {
    this.b2dutil = b2dutil

    // Colors
    this.fillColor = `rgb(${random(200, 255)}, ${random(200, 255)}, ${random(200, 255)})`
    this.strokeColor = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`

    // Create a body
    this.body = b2dutil.world.CreateBody(bodyDef)

    // Create a shape
    const shape = new b2.b2CircleShape()
    shape.m_radius = random(5, 15)

    // Create a fixture
    this.body.CreateFixture({
      shape,
      density: 10,
      friction: 0.6,
      restitution: 0.01,
    })
  }

  get shape() {
    return this.body.GetFixtureList()!.GetShape() as b2.b2CircleShape
  }

  render(ctx: CanvasRenderingContext2D) {
    renderCircle({
      ctx,
      ...this,
      shape: this.shape,
    })
  }
}
