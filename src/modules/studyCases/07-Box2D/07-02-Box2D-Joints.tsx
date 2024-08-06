import { PageDemo } from 'modules/pages/PageDemo'

import { random } from 'modules/math'

import * as b2 from '@box2d/core'
import { Box2DUtil, Renderable } from './box2d-utils/Box2DUtil'
import { Surface } from './objects/Surface'
import { getCanvasPropsPatchedWithControls } from './box2d-utils/getCanvasPropsPatchedWithCameraControls'
import { Circle } from './objects/Circle'
import { B2dDistanceJoint } from './objects/B2dDistanceJoint'
import { setInitialPush } from './box2d-utils/setInitialPush'
import { Windmill } from './objects/Windmill'
import { Bridge } from './objects/Bridge'
import { links } from 'modules/appCore/links'
import { B2dObject } from './objects/B2dObject'

type DrawState = {
  b2dutil: Box2DUtil
  figures: B2dObject[]
  staticFigures: Renderable[]
  lastFigureTime: number
}

export const Box2DJointsPage = () => (
  <PageDemo<DrawState>
    next={links.box2dMouseJoint}
    srcLink="07-Box2D/07-02-Box2D-Joints.tsx"
    hint={
      <>
        spawn shapes: LMB
        <br />
        zoom: scroll
        <br />
        move: shift / MMB
        <br />
        wind: space
      </>
    }
    setup={({ canvasUtil }) => {
      const b2dutil = new Box2DUtil(canvasUtil)

      const terrain = new Surface(b2dutil)
      const bridge = new Bridge(b2dutil)
      const windmill = new Windmill(b2dutil)

      return {
        b2dutil,
        figures: [],
        staticFigures: [terrain, windmill, bridge],
        lastFigureTime: Date.now(),
      }
    }}
    canvasProps={getCanvasPropsPatchedWithControls(() => ({}))}
    render={({ canvasUtil, drawState }) => {
      const { ctx, deltaTime, nowTime } = canvasUtil
      const { b2dutil, mouse, isMousePressed, lastFigureTime } = drawState
      const { coords } = b2dutil

      /**
       * Add new joined objects
       */
      if (mouse && isMousePressed && nowTime - lastFigureTime > 150) {
        const mouseCoordsWorld = coords.screenToWorld(mouse.x, mouse.y)

        const circle1 = new Circle(b2dutil, {
          type: b2.b2BodyType.b2_dynamicBody,
          position: new b2.b2Vec2(mouseCoordsWorld.x, mouseCoordsWorld.y),
        })

        const circle2 = new Circle(b2dutil, {
          type: b2.b2BodyType.b2_dynamicBody,
          position: new b2.b2Vec2(
            mouseCoordsWorld.x +
              random(1.5, 3) * (random(0, 1, false) === 0 ? -1 : 1),
            mouseCoordsWorld.y +
              random(1.5, 3) * (random(0, 1, false) === 0 ? -1 : 1),
          ),
        })

        const joint = new B2dDistanceJoint(b2dutil, circle1, circle2)

        setInitialPush(circle1.body)
        setInitialPush(circle2.body)

        drawState.figures.push(circle1)
        drawState.figures.push(circle2)
        drawState.staticFigures.push(joint)

        drawState.lastFigureTime = nowTime
      }

      /**
       * Wind, Physics, Draw
       */
      b2dutil.applyWindKey(drawState)
      b2dutil.stepAndRender(deltaTime / 100, drawState, ctx)
    }}
  />
)
