import * as b2 from '@box2d/core'
import { random } from 'lodash'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { renderBox } from '../renderers/render-box'
import { renderCircle } from '../renderers/render-circle'

export class ComplexBody {
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

    // Create shapes
    const boxSize = new Vector(random(5, 15), random(20, 25))
    const boxShape = new b2.b2PolygonShape()
    boxShape.SetAsBox(boxSize.x / 2, boxSize.y / 2)

    const circleR = random(10, 15)
    const circleShape = new b2.b2CircleShape()
    circleShape.m_radius = circleR
    circleShape.m_p.Set(0, circleR + boxSize.y / 2)

    // Create a fixture
    this.body.CreateFixture({
      shape: boxShape,
      density: 10,
      friction: 0.6,
      restitution: 0.01,
    })
    this.body.CreateFixture({
      shape: circleShape,
      density: 10,
      friction: 0.6,
      restitution: 0.01,
    })
  }

  render(ctx: CanvasRenderingContext2D) {
    let fixture = this.body.GetFixtureList()

    while (fixture) {
      const shape = fixture.GetShape()

      if (shape instanceof b2.b2PolygonShape) {
        renderBox({
          ctx,
          shape: shape,
          ...this,
        })
      } else if (shape instanceof b2.b2CircleShape) {
        renderCircle({
          ctx,
          shape: shape,
          ...this,
        })
      }

      fixture = fixture.GetNext()
    }
  }
}
