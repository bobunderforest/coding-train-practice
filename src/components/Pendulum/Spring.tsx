import * as React from 'react'
import { DemoPage } from '../Layout/DemoPage'
import { Vector } from '../Vectors/VectorMutable'
import { Mover } from '../Forces/Mover'
// import { links } from 'utils/links'

interface SpringArgs {
  anchor: Vector
  restLen: number
}

class SpringMover {
  anchor: Vector
  restLen: number
  elastic: number = 0.025

  constructor(args: SpringArgs) {
    this.anchor = args.anchor.copy()
    this.restLen = args.restLen
  }

  connect(bob: Mover) {
    const springForce = bob.pos.copy()
    springForce.sub(this.anchor)
    const currLen = springForce.mag()
    const stretch = currLen - this.restLen
    springForce.norm()
    springForce.mult(-this.elastic * stretch)
    bob.applyForce(springForce)
  }

  render(ctx: CanvasRenderingContext2D, target: Vector) {
    ctx.beginPath()
    ctx.moveTo(this.anchor.x, this.anchor.y)
    ctx.lineTo(target.x, target.y)
    ctx.strokeStyle = '#ccc'
    ctx.stroke()
  }
}

const windForce = new Vector(0.5, 0)

interface DrawState {
  isWind?: boolean
  bob: Mover
  spring: SpringMover
}

const Page = DemoPage as new () => DemoPage<DrawState>

export const Spring = () => (
  <Page
    // next={links.dragResistance}
    hint="click for wind"
    srcLink="Pendulum/Spring.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () => (drawState.isWind = true),
      onMouseUp: () => (drawState.isWind = false),
    })}
    setup={({ width, height }) => ({
      bob: new Mover(width * 0.5, height * 0.7),
      spring: new SpringMover({
        anchor: new Vector(width * 0.5, 0),
        restLen: height * 0.5,
      }),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      drawState.bob.gravity()
      if (drawState.isWind) drawState.bob.applyForce(windForce)

      drawState.spring.connect(drawState.bob)
      drawState.bob.update()

      drawState.spring.render(ctx, drawState.bob.pos)
      drawState.bob.render(ctx)
    }}
  />
)
