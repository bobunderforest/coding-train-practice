import { PageDemo } from 'modules/pages/PageDemo'
import { links } from 'modules/appCore/links'

import { random } from 'modules/math'
import { Vector } from 'modules/math/vectors/VectorMutable'

import * as b2 from '@box2d/core'
import { Box2DUtil } from './box2d-utils/Box2DUtil'
import { Box } from './objects/Box'
import { Circle } from './objects/Circle'
import { Surface } from './objects/Surface'
import { ComplexBody } from './objects/ComplexBody'
import { CustomPolygon } from './objects/CustomPolygon'
import type { B2dObject } from './objects/B2dObject'
import { renderPoint } from './renderers/render-point'
import { getCanvasPropsPatchedWithControls } from './box2d-utils/getCanvasPropsPatchedWithCameraControls'
import { setInitialPush } from './box2d-utils/setInitialPush'

type DrawState = {
  b2dutil: Box2DUtil
  figures: B2dObject[]
  customFigureVerticies: b2.b2Vec2[]
}

export const Box2DBasicPage = () => (
  <PageDemo<DrawState>
    next={links.box2dJoints}
    srcLink="07-Box2D/07-01-Box2D-Basic.tsx"
    hint={
      <>
        spawn shapes: LMB
        <br />
        zoom: scroll
        <br />
        move: shift / MMB
        <br />
        custom shape: alt+click; enter
      </>
    }
    setup={({ canvasUtil }) => {
      const b2dutil = new Box2DUtil(canvasUtil)

      const staticBox = new Box(b2dutil, new Vector(25, 2), {
        type: b2.b2BodyType.b2_staticBody,
        position: new b2.b2Vec2(0, 0),
      })

      const terrain = new Surface(b2dutil)

      return {
        b2dutil,
        figures: [staticBox, terrain],
        customFigureVerticies: [],
      }
    }}
    afterSetup={({ drawState }) => {
      document.addEventListener('keydown', e => {
        if (e.code === 'Enter' && drawState.customFigureVerticies.length > 2) {
          const newShape = new CustomPolygon(
            drawState.b2dutil,
            drawState.customFigureVerticies,
            {
              type: b2.b2BodyType.b2_dynamicBody,
            },
          )
          drawState.figures.push(newShape)
          drawState.customFigureVerticies = []
        }
      })
    }}
    canvasProps={getCanvasPropsPatchedWithControls<DrawState>(
      ({ drawState }) => ({
        onMouseDown: e => {
          if (e.altKey || e.metaKey) {
            drawState.isMousePressed = false
          }
        },
        onClick: e => {
          if (e.altKey || e.metaKey) {
            const { coords } = drawState.b2dutil
            const point = coords.screenToWorld(e.clientX, e.clientY)
            drawState.customFigureVerticies.push(
              new b2.b2Vec2(point.x, point.y),
            )
          }
        },
      }),
    )}
    render={({ canvasUtil, drawState }) => {
      const { ctx, deltaTime } = canvasUtil
      const { b2dutil, isMousePressed, mouse, figures, customFigureVerticies } =
        drawState
      const { coords } = b2dutil

      /**
       * Add new shape
       */
      if (mouse && isMousePressed) {
        const mouseCoordsWorld = coords.screenToWorld(mouse.x, mouse.y)

        const shapeIdx = random(0, 2, false)
        let newShape: Box | Circle | ComplexBody | undefined
        switch (shapeIdx) {
          case 0: {
            newShape = new Box(
              b2dutil,
              new Vector(random(1, 5), random(1, 5)),
              {
                type: b2.b2BodyType.b2_dynamicBody,
                position: new b2.b2Vec2(mouseCoordsWorld.x, mouseCoordsWorld.y),
              },
            )
            break
          }
          case 1: {
            newShape = new Circle(b2dutil, {
              type: b2.b2BodyType.b2_dynamicBody,
              position: new b2.b2Vec2(mouseCoordsWorld.x, mouseCoordsWorld.y),
            })
            break
          }
          case 2: {
            newShape = new ComplexBody(b2dutil, {
              type: b2.b2BodyType.b2_dynamicBody,
              position: new b2.b2Vec2(mouseCoordsWorld.x, mouseCoordsWorld.y),
            })
            break
          }
          default:
            break
        }

        // Initial force
        if (newShape) {
          figures.push(newShape)
          setInitialPush(newShape.body)
        }
      }

      /**
       * Calc Physics Step
       */
      b2dutil.step(deltaTime / 100)

      /**
       * Draw
       */
      for (const f of figures) {
        f.render(ctx)
      }
      for (const v of customFigureVerticies) {
        const point = coords.worldToScreen(v.x, v.y)
        renderPoint(ctx, point, '#f77')
      }
    }}
  />
)
