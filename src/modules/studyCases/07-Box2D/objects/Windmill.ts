import * as b2 from '@box2d/core'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { B2dRevoluteJoint } from './B2dRevoluteJoint'
import { Box } from './Box'

export class Windmill {
  pile: Box
  fan: Box

  constructor(b2dutil: Box2DUtil) {
    this.pile = new Box(b2dutil, new Vector(2, 25), {
      type: b2.b2BodyType.b2_staticBody,
      position: new b2.b2Vec2(1.25, -6.5),
    })

    const fanCenter = new b2.b2Vec2(1.25, 5)
    this.fan = new Box(b2dutil, new Vector(20, 1), {
      type: b2.b2BodyType.b2_dynamicBody,
      position: fanCenter,
    })

    const revoluteJoint = new B2dRevoluteJoint(
      b2dutil,
      this.pile,
      this.fan,
      fanCenter,
    )
    revoluteJoint.joint.SetMotorSpeed(-1)
    revoluteJoint.joint.SetMaxMotorTorque(100000000)
    revoluteJoint.joint.EnableMotor(true)
  }

  render(ctx: CanvasRenderingContext2D) {
    this.pile.render(ctx)
    this.fan.render(ctx)
  }
}
