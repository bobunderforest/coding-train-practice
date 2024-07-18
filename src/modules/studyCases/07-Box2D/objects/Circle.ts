import * as b2 from '@box2d/core'
import { random } from 'modules/math'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { renderCircle } from '../renderers/render-circle'
import { B2dObject } from './B2dObject'

export class Circle extends B2dObject {
  constructor(
    b2dutil: Box2DUtil,
    bodyDef: b2.b2BodyDef,
    args: { radius?: number } = {},
  ) {
    const { radius = random(5, 15) } = args

    super(b2dutil, bodyDef)

    // Create a shape
    const shape = new b2.b2CircleShape()
    shape.m_radius = radius

    // Create a fixture
    this.body.CreateFixture({
      shape,
      density: 1,
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
