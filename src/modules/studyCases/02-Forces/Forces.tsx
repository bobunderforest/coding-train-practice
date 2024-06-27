import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Mover } from 'modules/math/physics/MoverWithMass'
import { random } from 'modules/math'
import { links } from 'modules/appCore/links'

const windForce = new Vector(0.5, 0)

type DrawState = {
  guys: Mover[]
  isWind?: boolean
}

export const Forces = () => (
  <PageDemo<DrawState>
    hint="click for wind"
    next={links.dragResistance}
    srcLink="02-Forces/Forces.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () => (drawState.isWind = true),
      onMouseUp: () => (drawState.isWind = false),
    })}
    setup={({ canvasUtil }) => {
      return {
        guys: Array.from(Array(6)).map(
          () =>
            new Mover(
              canvasUtil,
              random(90, canvasUtil.width - 90),
              canvasUtil.height / 2,
            ),
        ),
      }
    }}
    render={({ canvasUtil, drawState }) => {
      const { ctx, width, height } = canvasUtil
      drawState.guys.forEach(guy => {
        // Wind
        if (drawState.isWind) guy.applyForce(windForce)

        // Gravity
        guy.gravity()

        guy.edges(width, height)
        guy.update()
        guy.render(ctx)
      })
    }}
  />
)
