import { PageDemo } from 'modules/pages/PageDemo'
import { Mover } from 'modules/math/physics/MoverWithMass'
import { random, sqr } from 'modules/math'
import { colors } from 'modules/styles/styles'
import { links } from 'modules/appCore/links'

type DrawState = {
  guys?: Mover[]
}

export const DragResistance = () => (
  <PageDemo<DrawState>
    next={links.gravityAttraction}
    srcLink="02-Forces/DragResistance.tsx"
    setup={({ width }) => ({
      guys: Array.from(Array(6)).map(
        () => new Mover(random(90, width - 90), 100),
      ),
    })}
    render={({ ctx, width, height, drawState }) => {
      // Friction force
      // const coeff = -0.1
      // const friction = guy.vel.copy()
      // friction.norm()
      // friction.mult(coeff)
      // guy.applyForce(friction)

      // Draw liquid
      ctx.save()
      ctx.fillStyle = colors.brandHover
      ctx.globalAlpha = 0.25
      ctx.fillRect(0, height / 2, width, height)
      ctx.restore()

      if (!drawState.guys) return
      drawState.guys.forEach(guy => {
        // Gravity
        guy.gravity()

        // Apply liquid drag resistance force
        if (guy.pos.y > height / 2) {
          const coeff = -0.00125
          const drag = guy.vel.copy()
          const speed = guy.vel.mag()
          drag.mult(coeff * sqr(speed))
          guy.applyForce(drag)
        }

        guy.edges(width, height)
        guy.update()
        guy.render(ctx)
      })
    }}
  />
)
