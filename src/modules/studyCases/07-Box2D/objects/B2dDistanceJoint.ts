import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { B2dObject } from './B2dObject'
import { random } from 'modules/math'

export class B2dDistanceJoint {
  b2dutil: Box2DUtil
  object1: B2dObject
  object2: B2dObject
  joint: b2.b2DistanceJoint
  strokeColor: string

  constructor(b2dutil: Box2DUtil, object1: B2dObject, object2: B2dObject) {
    this.b2dutil = b2dutil
    this.object1 = object1
    this.object2 = object2

    // Define the joint
    const djdef = new b2.b2DistanceJointDef()
    djdef.length = 50
    djdef.minLength = 10
    djdef.maxLength = 100
    // djdef.damping = 1
    // djdef.stiffness = 0.1
    djdef.Initialize(
      object1.body,
      object2.body,
      object1.body.GetWorldCenter(),
      object2.body.GetWorldCenter(),
    )

    this.joint = b2dutil.world.CreateJoint(djdef)

    this.strokeColor = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`
  }

  render(ctx: CanvasRenderingContext2D) {
    const { coords } = this.b2dutil

    const point1 = this.joint.GetBodyA().GetWorldCenter()
    const point2 = this.joint.GetBodyB().GetWorldCenter()

    const point1Screen = coords.worldToScreen(point1.x, point1.y)
    const point2Screen = coords.worldToScreen(point2.x, point2.y)

    ctx.moveTo(point1Screen.x, point1Screen.y)
    ctx.lineTo(point2Screen.x, point2Screen.y)
    ctx.lineWidth = 1
    ctx.strokeStyle = this.strokeColor
    ctx.stroke()
    ctx.fill()
  }
}
