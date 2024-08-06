import { PageDemo } from 'modules/pages/PageDemo'

import { random } from 'modules/math'

import * as b2 from '@box2d/core'
import { Box2DUtil, Renderable } from './box2d-utils/Box2DUtil'
import { Surface } from './objects/Surface'
import { getCanvasPropsPatchedWithControls } from './box2d-utils/getCanvasPropsPatchedWithCameraControls'
import { setInitialPush } from './box2d-utils/setInitialPush'
import { Box } from './objects/Box'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { MouseJoint } from './objects/MouseJoint'
import { B2dObject } from './objects/B2dObject'
import { links } from 'modules/appCore/links'

const BOX_SPAWN_INTERVAL = 300
const BOXES_LIMIT = 100

type DrawState = {
  b2dutil: Box2DUtil
  figures: B2dObject[]
  staticFigures: Renderable[]
  mouseJoint: MouseJoint | null
  lastFigureTime: number
}

export const Box2DMouseJoint = () => (
  <PageDemo<DrawState>
    next={links.box2dMutalAttraction}
    srcLink="07-Box2D/07-03-Box2D-Mouse-Joint.tsx"
    hint={
      <>
        drag boxes: LMB
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

      return {
        b2dutil,
        figures: [],
        staticFigures: [terrain],
        mouseJoint: null,
        lastFigureTime: Date.now() - BOX_SPAWN_INTERVAL,
      }
    }}
    canvasProps={getCanvasPropsPatchedWithControls(() => ({}))}
    render={({ canvasUtil, drawState }) => {
      const { ctx, deltaTime, nowTime } = canvasUtil
      const { b2dutil, mouseJoint, mouse, isMousePressed, lastFigureTime } =
        drawState
      const { world, coords } = b2dutil

      /**
       * Mouse joint
       */
      if (mouse && isMousePressed) {
        const mouseCoordsWorld = coords.screenToWorld(mouse.x, mouse.y)

        if (mouseJoint) {
          // Move the joint
          mouseJoint.update(mouseCoordsWorld)
        } else {
          // Create the joint
          world.QueryFixturePoint(mouseCoordsWorld, fixture => {
            drawState.mouseJoint = new MouseJoint(
              b2dutil,
              fixture.GetBody(),
              mouseCoordsWorld,
            )
            return false
          })
        }
      } else if (mouseJoint) {
        // Destroy the joint
        mouseJoint.destroy()
        drawState.mouseJoint = null
      }

      /**
       * Spawn new objects
       */
      if (
        nowTime - lastFigureTime > BOX_SPAWN_INTERVAL &&
        drawState.figures.length < BOXES_LIMIT
      ) {
        const newShape = new Box(
          b2dutil,
          new Vector(random(2, 5), random(2, 5)),
          {
            type: b2.b2BodyType.b2_dynamicBody,
            position: new b2.b2Vec2(0, 0),
          },
        )
        setInitialPush(newShape.body)
        drawState.figures.push(newShape)
        drawState.staticFigures.push(newShape)
        drawState.lastFigureTime = nowTime
      }

      /**
       * Wind, Physics, Draw
       */
      b2dutil.applyWindKey(drawState)
      b2dutil.stepAndRender(deltaTime / 100, drawState, ctx)
      drawState.mouseJoint?.render(ctx)
    }}
  />
)
