import * as b2 from '@box2d/core'
import { PageDemo } from 'modules/pages/PageDemo'
import { random } from 'modules/math'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Box } from './Box'
import { Box2DUtil } from './Box2DUtil'
import { links } from 'modules/appCore/links'
import { Surface } from './Surface'

type DrawState = {
  b2dutil: Box2DUtil
  figures: (Box | Surface)[]
}

export const Box2DBasicPage = () => (
  <PageDemo<DrawState>
    srcLink="07-Box2D/07-01-Box2D-Basic.tsx"
    hint={
      <>
        spawn boxes — LMB
        <br />
        zoom — scroll
        <br />
        move — shift / MMB
      </>
    }
    setup={({ canvasUtil }) => {
      const b2dutil = new Box2DUtil(canvasUtil)

      const staticBox = new Box(b2dutil, new Vector(200, 20), {
        type: b2.b2BodyType.b2_staticBody,
        position: new b2.b2Vec2(0, -50),
      })

      const terrain = new Surface(b2dutil)

      return {
        b2dutil,
        figures: [terrain, staticBox],
        terrain,
      }
    }}
    canvasProps={Box2DUtil.GetPropsPatchedWithControls({})}
    render={({ canvasUtil, drawState }) => {
      const { ctx, deltaTime } = canvasUtil
      const { b2dutil, isMousePressed, mouse, figures } = drawState
      const { world, coords, isWheelPressed, grabMove } = b2dutil

      /**
       * Add new box
       */
      if (mouse && isMousePressed && !grabMove && !isWheelPressed) {
        const mouseCoordsWorld = coords.screenToWorld(mouse)
        const box = new Box(
          b2dutil,
          new Vector(random(10, 25), random(10, 25)),
          {
            type: b2.b2BodyType.b2_dynamicBody,
            position: new b2.b2Vec2(mouseCoordsWorld.x, mouseCoordsWorld.y),
          },
        )
        figures.push(box)
      }

      /**
       * Physics
       */
      world.Step(deltaTime / 100, {
        velocityIterations: 10,
        positionIterations: 10,
      })

      /**
       * Draw
       */
      for (const f of figures) {
        f.render(ctx)
      }
    }}
  />
)
