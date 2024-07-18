import * as b2 from '@box2d/core'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { renderBox } from '../renderers/render-box'
import { B2dObject } from './B2dObject'

export class Box extends B2dObject {
  constructor(b2dutil: Box2DUtil, size: Vector, bodyDef: b2.b2BodyDef) {
    super(b2dutil, bodyDef)

    // Create a shape
    const shape = new b2.b2PolygonShape()
    shape.SetAsBox(size.x / 2, size.y / 2)

    // Create a fixture
    this.body.CreateFixture({
      shape,
      density: 10,
      friction: 0.6,
      restitution: 0.01,
    })
  }

  get shape() {
    return this.body.GetFixtureList()!.GetShape() as b2.b2PolygonShape
  }

  render(ctx: CanvasRenderingContext2D) {
    renderBox({
      ctx,
      ...this,
      shape: this.shape,
    })
  }
}
