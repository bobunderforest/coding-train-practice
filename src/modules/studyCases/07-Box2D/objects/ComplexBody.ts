import * as b2 from '@box2d/core'
import { random } from 'modules/math'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { renderBox } from '../renderers/render-box'
import { renderCircle } from '../renderers/render-circle'
import { B2dObject } from './B2dObject'

export class ComplexBody extends B2dObject {
  constructor(b2dutil: Box2DUtil, bodyDef: b2.b2BodyDef) {
    super(b2dutil, bodyDef)

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
