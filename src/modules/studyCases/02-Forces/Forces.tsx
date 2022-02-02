import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/physics/VectorMutable'
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
    srcLink="Forces/Forces.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () => (drawState.isWind = true),
      onMouseUp: () => (drawState.isWind = false),
    })}
    setup={({ width, height }) => ({
      guys: Array.from(Array(6)).map(
        () => new Mover(random(90, width - 90), height / 2),
      ),
    })}
    render={({ ctx, width, height, drawState }) => {
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
