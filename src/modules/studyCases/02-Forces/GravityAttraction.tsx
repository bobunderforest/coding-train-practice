import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Mover } from 'modules/math/physics/MoverWithMass'
import { random } from 'modules/math'
import { links } from 'modules/appCore/links'
import { Attractor, gravityAttraction } from './gravityAttractionFn'

type DrawState = {
  attractor: Attractor
  guys: Mover[]
  isMoving?: boolean
  mouse?: Vector
}

export const GravityAttraction = () => (
  <PageDemo<DrawState>
    hint="click to move attractor"
    next={links.mutalAttraction}
    srcLink="02-Forces/GravityAttraction.tsx"
    setup={({ canvasUtil }) => {
      const { width, height } = canvasUtil
      const guys = Array.from(Array(3)).map(() => {
        const border = height * 0.1
        const avRange = (height - border * 2) / 2
        const range = random(border, avRange)

        const guy = new Mover(canvasUtil, width / 2, range)
        const initForce = (avRange - range) / ((1 / guy.mass) * 20)
        guy.applyForce(new Vector(initForce, 0))

        return guy
      })
      return {
        attractor: new Attractor(canvasUtil, width / 2, height / 2),
        guys,
      }
    }}
    render={({ canvasUtil, drawState }) => {
      const { ctx } = canvasUtil
      const { mouse, isMousePressed, attractor, guys } = drawState

      if (isMousePressed && mouse) {
        attractor.pos.x = mouse.x
        attractor.pos.y = mouse.y
      }

      guys.forEach(guy => {
        gravityAttraction(attractor, guy)
        guy.update()
        guy.render(ctx)
      })

      attractor.render(ctx)
    }}
  />
)
