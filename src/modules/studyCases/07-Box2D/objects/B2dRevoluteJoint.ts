import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { B2dObject } from './B2dObject'

export class B2dRevoluteJoint {
  b2dutil: Box2DUtil
  object1: B2dObject
  object2: B2dObject
  joint: b2.b2RevoluteJoint

  constructor(
    b2dutil: Box2DUtil,
    object1: B2dObject,
    object2: B2dObject,
    anchor: b2.XY,
  ) {
    this.b2dutil = b2dutil
    this.object1 = object1
    this.object2 = object2

    // Define the joint
    const rjdef = new b2.b2RevoluteJointDef()
    rjdef.Initialize(object1.body, object2.body, anchor)

    this.joint = b2dutil.world.CreateJoint(rjdef)
  }

  render(ctx: CanvasRenderingContext2D) {
    return
  }
}
