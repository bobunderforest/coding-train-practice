import * as b2 from '@box2d/core'
import { random } from 'lodash'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { renderPolygon } from '../renderers/render-polygon'

export class CustomPolygon {
  b2dutil: Box2DUtil
  fillColor: string
  strokeColor: string
  body: b2.b2Body

  constructor(
    b2dutil: Box2DUtil,
    vertices: b2.b2Vec2[],
    bodyDef: b2.b2BodyDef,
  ) {
    this.b2dutil = b2dutil

    // Colors
    this.fillColor = `rgb(${random(200, 255)}, ${random(200, 255)}, ${random(200, 255)})`
    this.strokeColor = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`

    // Create a body
    this.body = b2dutil.world.CreateBody(bodyDef)

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
