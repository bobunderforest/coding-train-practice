import * as React from 'react'
import { DemoPage } from 'components/Layout/DemoPage'
import { FullScreenCanvas } from 'components/Utils/FullScreenCanvas'
import { Vector } from 'components/Vectors/VectorMutable'
import { Mover } from './Mover'
import { random, sqr } from 'utils'
import { colors } from 'utils/styles'

const windForce = new Vector(0.5, 0)

interface DrawState {
  guys?: Mover[]
  isWind?: boolean
  shouldSetup?: boolean
}

export class DragResistance extends React.PureComponent<{}> {
  drawState: DrawState = { shouldSetup: true }

  setup(x: number, y: number) {
    this.drawState.guys = Array.from(Array(6)).map(
      () => new Mover(new Vector(random(90, x - 90), 100)),
    )
    this.drawState.shouldSetup = false
  }

  render() {
    return (
      <DemoPage srcLink="https://github.com/manneredboor/coding-train-practice/blob/master/src/components/Forces/DragResistance.tsx">
        <FullScreenCanvas
          onMouseDown={() => {
            this.drawState.isWind = true
          }}
          onMouseUp={() => {
            this.drawState.isWind = false
          }}
          render={({ ctx, width, height }) => {
            if (this.drawState.shouldSetup) this.setup(width, height)

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

            if (!this.drawState.guys) return
            this.drawState.guys.forEach(guy => {
              // Wind
              if (this.drawState.isWind) guy.applyForce(windForce)

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
              guy.update(width, height)
              guy.render(ctx)
            })
          }}
        />
      </DemoPage>
    )
  }
}
