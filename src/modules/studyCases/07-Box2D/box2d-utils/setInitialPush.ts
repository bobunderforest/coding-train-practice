import * as b2 from '@box2d/core'
import { random } from 'modules/math'

const UP_FORCE = 12
const SIDE_FORCE = 3
const ANGULAR_FORCE = 1

export function setInitialPush(body: b2.b2Body) {
  body.SetLinearVelocity(
    new b2.b2Vec2(
      random(-SIDE_FORCE, SIDE_FORCE),
      random(-SIDE_FORCE, UP_FORCE),
    ),
  )
  body.SetAngularVelocity(random(-ANGULAR_FORCE, ANGULAR_FORCE))
}
