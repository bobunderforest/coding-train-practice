import { PageDemo } from 'modules/pages/PageDemo'

import { clamp, random } from 'modules/math'

import * as b2 from '@box2d/core'
import { Box2DUtil, Renderable } from './box2d-utils/Box2DUtil'
import { getCanvasPropsPatchedWithControls } from './box2d-utils/getCanvasPropsPatchedWithCameraControls'
import { setInitialPush } from './box2d-utils/setInitialPush'
import { B2dObject } from './objects/B2dObject'
import { Circle } from './objects/Circle'

const CIRCLE_SPAWN_INTERVAL = 25

type DrawState = {
  b2dutil: Box2DUtil
  figures: B2dObject[]
  staticFigures: Renderable[]
  lastFigureTime: number
  followedItemIdx: number
  cameraMode: 0 | 1 | 2
}

export const Box2DMutalAttraction = () => (
  <PageDemo<DrawState>
    // next={links.}
    srcLink="07-Box2D/07-04-Box2D-MutalAttraction.tsx"
    hint={
      <>
        toggle camera mode: space
        <br />
        (follow / follow + rotate / free)
        <br />
        change folloed circle: ← →
        <br />
        spawn circles: LMB
        <br />
        zoom: scroll
        <br />
        move: shift / MMB
      </>
    }
    setup={({ canvasUtil }) => {
      const b2dutil = new Box2DUtil(canvasUtil, {
        gravity: { x: 0, y: 0 },
      })

      const ITEMS_COUNT = 225
      const ITEMS_ROW_COUNT = Math.sqrt(ITEMS_COUNT)
      const ITEMS_SPACE = 15
      const HALF_OFFSET = (ITEMS_ROW_COUNT * ITEMS_SPACE) / 2 - ITEMS_SPACE / 2

      const circles = Array.from(Array(ITEMS_COUNT)).map((_, i) => {
        const row = Math.floor(i / ITEMS_ROW_COUNT)
        const item = i % ITEMS_ROW_COUNT
        const circle = new Circle(
          b2dutil,
          {
            type: b2.b2BodyType.b2_dynamicBody,
            position: {
              x: item * ITEMS_SPACE - HALF_OFFSET,
              y: row * ITEMS_SPACE - HALF_OFFSET,
            },
          },
          {
            radius: random(0.2, 0.5),
          },
        )

        setInitialPush(circle.body)
        return circle
      })

      return {
        b2dutil,
        figures: [...circles],
        staticFigures: [],
        lastFigureTime: Date.now() - CIRCLE_SPAWN_INTERVAL,
        followedItemIdx: Math.round(circles.length / 2),
        cameraMode: 1,
      }
    }}
    canvasProps={getCanvasPropsPatchedWithControls(() => ({}))}
    afterSetup={({ drawState }) => {
      window.addEventListener('keydown', e => {
        if (e.code === 'ArrowRight') {
          drawState.followedItemIdx += 1
          if (drawState.followedItemIdx === drawState.figures.length) {
            drawState.followedItemIdx = 0
          }
        } else if (e.code === 'ArrowLeft') {
          drawState.followedItemIdx -= 1
          if (drawState.followedItemIdx < 0) {
            drawState.followedItemIdx = drawState.figures.length - 1
          }
        } else if (e.code === 'Space') {
          drawState.cameraMode += 1
          if (drawState.cameraMode === 3) drawState.cameraMode = 0
        }
      })
    }}
    render={({ canvasUtil, drawState }) => {
      const { ctx, deltaTime, nowTime } = canvasUtil
      const { b2dutil, mouse, isMousePressed, lastFigureTime } = drawState
      const { world, coords } = b2dutil

      /**
       * Spawn new objects
       */
      if (
        mouse &&
        isMousePressed &&
        nowTime - lastFigureTime > CIRCLE_SPAWN_INTERVAL
      ) {
        const mouseCoordsWorld = coords.screenToWorld(mouse.x, mouse.y)

        const circle = new Circle(
          b2dutil,
          {
            type: b2.b2BodyType.b2_dynamicBody,
            position: new b2.b2Vec2(mouseCoordsWorld.x, mouseCoordsWorld.y),
          },
          {
            radius: random(0.5, 1.5),
          },
        )

        drawState.figures.push(circle)

        drawState.lastFigureTime = nowTime
      }

      /**
       * Mutal Attraction
       */
      const G = 1
      drawState.figures.forEach(figure1 => {
        drawState.figures.forEach(figure2 => {
          if (figure1 === figure2) return

          const pos1 = figure1.body.GetWorldCenter().Clone()
          const pos2 = figure2.body.GetWorldCenter().Clone()

          const force = pos1.Subtract(pos2)
          const d = clamp(0.5, force.Length(), 25)
          force.Normalize()

          const mass = figure1.body.GetMass() || 50
          const forceStrenght = (G * mass) / (d * d)
          force.Scale(forceStrenght)

          figure2.applyForce(force)
        })
      })

      /**
       * Physics Step
       */

      world.Step(deltaTime / 100, {
        velocityIterations: 8,
        positionIterations: 3,
      })

      /**
       * Camera following
       */
      if (drawState.cameraMode > 0) {
        const followedItem = drawState.figures[drawState.followedItemIdx]
        const followedPosition = followedItem.body.GetWorldCenter()
        coords.setOffset(followedPosition)

        if (drawState.cameraMode === 2) {
          ctx.save()
          const angle = followedItem.body.GetAngle()
          const cameraPosition = coords.worldToScreen(
            followedPosition.x,
            followedPosition.y,
          )

          ctx.translate(cameraPosition.x, cameraPosition.y)
          ctx.rotate(angle)
          ctx.translate(-cameraPosition.x, -cameraPosition.y)
        }
      }

      for (const f of [...drawState.figures, ...drawState.staticFigures]) {
        f.render(ctx)
      }
      if (drawState.cameraMode === 2) {
        ctx.restore()
      }
    }}
  />
)
