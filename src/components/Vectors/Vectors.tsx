import * as React from 'react'
import { DemoPage } from 'components/Layout/DemoPage'
import { FullScreenCanvas } from 'components/Utils/FullScreenCanvas'
import { Vector } from './VectorImmutable'
import { colors } from 'utils/styles'
import * as links from 'utils/links'

export class Mover {
  acc: Vector
  pos: Vector
  vel: Vector

  constructor(pos: Vector) {
    this.pos = pos
    this.acc = new Vector(0, 0)
    this.vel = new Vector(0, 0)
  }

  update() {
    this.vel = this.vel.add(this.acc)
    this.pos = this.pos.add(this.vel)
  }

  bounce(x: number, y: number) {
    if (this.pos.x > x || this.pos.x < 0) this.vel.x *= -1
    if (this.pos.y > y || this.pos.y < 0) this.vel.y *= -1
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 20, 0, 360)
    ctx.fillStyle = colors.brand
    ctx.fill()
  }
}

interface DrawState {
  mouse?: Vector
  bitch?: Mover
}

export class Vectors extends React.PureComponent<{}> {
  drawState: DrawState = {}
  render() {
    return (
      <DemoPage
        hint="Move mouse around"
        nextLink={links.forces}
        nextText="Forces"
        srcLink="https://github.com/manneredboor/coding-train-practice/blob/master/src/components/Vectors/Vectors.tsx"
      >
        <FullScreenCanvas
          onMouseMove={e => {
            this.drawState.mouse = new Vector(e.pageX, e.pageY)
          }}
          onMouseOut={e => {
            this.drawState.mouse = undefined
          }}
          render={({ ctx, width, height }) => {
            if (!this.drawState.bitch) {
              this.drawState.bitch = new Mover(new Vector(100, 100))
            }

            const { bitch } = this.drawState
            const { mouse } = this.drawState

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
      </DemoPage>
    )
  }
}
