import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Mover } from 'modules/math/physics/MoverNoMass'
import { links } from 'modules/appCore/links'
import { colors } from 'modules/styles/styles'

type DrawState = {
  mover: Mover
}

export const Vectors = () => (
  <PageDemo<DrawState>
    hint="Move mouse around"
    next={links.forces}
    srcLink="02-Vectors/Vectors.tsx"
    removeMouseOnOut
    setup={({ canvasUtil }) => ({
      mover: new Mover(canvasUtil, new Vector(100, 100)),
    })}
    render={({ canvasUtil, drawState }) => {
      const { ctx, width, height } = canvasUtil
      const { mover } = drawState
      const { mouse } = drawState

      if (mouse) {
        // Calc path between mouse and current position
        const path = mouse.copy().sub(mover.pos)

        // Calc acceleration
        const acc = path.copy().setMag(0.5)
        mover.acc = acc

        // Draw line between mouse and mover
        ctx.beginPath()
        ctx.moveTo(mover.pos.x, mover.pos.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = '#ccc'
        ctx.stroke()
      }

      mover.update()
      mover.bounce(width, height)
      mover.render(ctx)

      // Draw mouse
      if (mouse) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 20, 0, 360)
        ctx.fillStyle = colors.brandHover
        ctx.fill()
      }
    }}
  />
)
