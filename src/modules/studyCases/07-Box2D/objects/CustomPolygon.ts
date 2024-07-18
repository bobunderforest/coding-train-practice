import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { renderPolygon } from '../renderers/render-polygon'
import { B2dObject } from './B2dObject'

export class CustomPolygon extends B2dObject {
  constructor(
    b2dutil: Box2DUtil,
    vertices: b2.b2Vec2[],
    bodyDef: b2.b2BodyDef,
  ) {
    super(b2dutil, bodyDef)

    // Create shapes
    const shape = new b2.b2PolygonShape()
    shape.Set(vertices, vertices.length)

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
    renderPolygon({
      ctx,
      ...this,
      shape: this.shape,
    })
  }
}
