import * as React from 'react'
import { DemoPage } from 'components/Layout/DemoPage'
import { Vector } from './VectorImmutable'
import { colors } from 'utils/styles'
import * as links from 'utils/links'

/**
 * Represents physical object
 */
export class Mover {
  // Acceleration
  acc: Vector
  // Position
  pos: Vector
  // Velocity
  vel: Vector

  constructor(pos: Vector) {
    this.pos = pos
    this.acc = new Vector(0, 0)
    this.vel = new Vector(0, 0)
  }

  update() {
    // Apply acc to velocity and velocity to position
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
  bitch: Mover
}

const Page = DemoPage as new () => DemoPage<DrawState>

export const Vectors = () => (
  <Page
    hint="Move mouse around"
    nextLink={links.forces}
    nextText="Forces"
    srcLink="https://github.com/manneredboor/coding-train-practice/blob/master/src/components/Vectors/Vectors.tsx"
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
