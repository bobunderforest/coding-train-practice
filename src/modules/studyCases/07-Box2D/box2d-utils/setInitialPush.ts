import * as b2 from '@box2d/core'
import { random } from 'modules/math'

export function setInitialPush(body: b2.b2Body) {
  body.SetLinearVelocity(new b2.b2Vec2(random(-25, 25), random(-25, 500)))
  body.SetAngularVelocity(random(-5, 5))
}
