import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/physics/VectorImmutable'
import { Mover } from 'modules/math/physics/MoverNoMass'
import { links } from 'modules/appCore/links'
import { colors } from 'modules/styles/styles'

type DrawState = {
  mouse?: Vector
  bitch: Mover
}

export const Vectors = () => (
  <PageDemo<DrawState>
    hint="Move mouse around"
    next={links.forces}
    srcLink="02-Vectors/Vectors.tsx"
    canvasProps={({ drawState }) => ({
      onMouseMove: e => (drawState.mouse = new Vector(e.pageX, e.pageY)),
      onMouseOut: e => (drawState.mouse = undefined),
    })}
    setup={() => ({
      bitch: new Mover(new Vector(100, 100)),
    })}
    render={({ ctx, width, height, drawState }) => {
      const { bitch } = drawState
      const { mouse } = drawState

      if (mouse) {
        // Calc path between mouse and current position
        const path = mouse.sub(bitch.pos)

        // Calc acceleration
        bitch.acc = path.setMag(0.5)

        // Draw line between mouse and bitch
        ctx.beginPath()
        ctx.moveTo(bitch.pos.x, bitch.pos.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = '#ccc'
        ctx.stroke()
      }

      bitch.update()
      bitch.bounce(width, height)
      bitch.render(ctx)

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
