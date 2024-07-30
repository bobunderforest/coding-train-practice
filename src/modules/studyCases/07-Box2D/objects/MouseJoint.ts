import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'

export class MouseJoint {
  b2dutil: Box2DUtil
  joint: b2.b2MouseJoint

  constructor(b2dutil: Box2DUtil, body: b2.b2Body, mouse: b2.XY) {
    this.b2dutil = b2dutil

    const mouseJointDef = new b2.b2MouseJointDef()
    mouseJointDef.bodyA = b2dutil.groundBody
    mouseJointDef.bodyB = body
    mouseJointDef.maxForce = 1000 * body.GetMass()
    mouseJointDef.damping = 0.7
    mouseJointDef.target.Set(mouse.x, mouse.y)

    const frequencyHz = 5
    b2.b2LinearStiffness(
      mouseJointDef,
      frequencyHz,
      mouseJointDef.damping,
      mouseJointDef.bodyA,
      mouseJointDef.bodyB,
    )

    this.joint = b2dutil.world.CreateJoint(mouseJointDef)
  }

  update(mouse: b2.XY) {
    this.joint.SetTarget(mouse)
  }

  destroy() {
    this.b2dutil.world.DestroyJoint(this.joint)
  }

  render(ctx: CanvasRenderingContext2D) {
    const { coords } = this.b2dutil

    const a = new b2.b2Vec2(0, 0)
    const b = new b2.b2Vec2(0, 0)
    this.joint.GetAnchorA(a)
    this.joint.GetAnchorB(b)

    // Draw
    ctx.save()
    const start = coords.worldToScreen(a.x, a.y)
    const end = coords.worldToScreen(b.x, b.y)
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.lineWidth = 1
    ctx.strokeStyle = `#aaf`
    ctx.stroke()
    ctx.restore()
  }
}
