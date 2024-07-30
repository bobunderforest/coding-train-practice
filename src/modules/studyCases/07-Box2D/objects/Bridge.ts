import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { Circle } from './Circle'
import { B2dDistanceJoint } from './B2dDistanceJoint'

export class Bridge {
  circles: Circle[] = []
  joints: B2dDistanceJoint[] = []

  constructor(b2dutil: Box2DUtil) {
    const total = 50
    const startX = -60
    const endX = 60
    const y = 45

    Array.from(Array(total)).forEach((_, i) => {
      const x = startX + i * ((endX - startX) / total)

      const circle = new Circle(
        b2dutil,
        {
          type:
            i === 0 || i === total - 1
              ? b2.b2BodyType.b2_staticBody
              : b2.b2BodyType.b2_dynamicBody,
          position: new b2.b2Vec2(x, y),
        },
        {
          radius: 1,
        },
      )

      if (i > 0) {
        const joint = new B2dDistanceJoint(b2dutil, this.circles[i - 1], circle)
        this.joints.push(joint)
      }

      this.circles.push(circle)
    })
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const f of this.circles) {
      f.render(ctx)
    }
    for (const j of this.joints) {
      j.render(ctx)
    }
  }
}
