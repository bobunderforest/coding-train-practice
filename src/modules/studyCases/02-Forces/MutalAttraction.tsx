import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { gravityAttraction } from './gravityAttractionFn'
import { Mover } from 'modules/math/physics/MoverWithMass'
import { random } from 'modules/math'
import { links } from 'modules/appCore/links'

type DrawState = {
  guys: Mover[]
}

export const MutalAttraction = () => (
  <PageDemo<DrawState>
    hint="click to create"
    next={links.portDefender}
    srcLink="02-Forces/MutalAttraction.tsx"
    canvasProps={({ canvasUtil, drawState }) => ({
      onMouseDown: () =>
        drawState.mouse &&
        drawState.guys.push(
          new Mover(canvasUtil, drawState.mouse.x, drawState.mouse.y),
        ),
    })}
    setup={({ canvasUtil }) => {
      const { width, height } = canvasUtil
      const guys = Array.from(Array(5)).map(() => {
        const initForce = new Vector(random(-1, 1), random(-1, 1))
        const guy = new Mover(canvasUtil, random(0, width), random(0, height))
        guy.applyForce(initForce)
        return guy
      })
      return {
        guys,
      }
    }}
    render={({ canvasUtil, drawState }) => {
      const { ctx, width, height } = canvasUtil
      const { guys } = drawState
      guys.forEach(guy => {
        guys.forEach(guy2 => gravityAttraction(guy, guy2))
        guy.edgesLoop(width, height)
        guy.update()
        guy.render(ctx)
      })
    }}
  />
)
