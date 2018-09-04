import * as React from 'react'
import { DemoPage } from '../Layout/DemoPage'
import { Vector } from '../Vectors/VectorMutable'
import { Mover } from '../Forces/Mover'
// import { links } from 'utils/links'

interface SpringArgs {
  origin: Vector
  restLen: number
  startPos: Vector
}

class SpringMover {
  bob: Mover
  origin: Vector
  restLen: number
  elastic: number = 0.025

  constructor(args: SpringArgs) {
    this.origin = args.origin.copy()
    this.restLen = args.restLen
    this.bob = new Mover(args.startPos.x, args.startPos.y)
  }

  // TODO: connect(mover: Mover)

  update() {
    const springF = this.bob.pos.copy()
    springF.sub(this.origin)
    const currLen = springF.mag()
    const stretch = currLen - this.restLen
    springF.norm()
    springF.mult(-this.elastic * stretch)
    this.bob.applyForce(springF)
    this.bob.update()
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.origin.x, this.origin.y)
    ctx.lineTo(this.bob.pos.x, this.bob.pos.y)
    ctx.strokeStyle = '#ccc'
    ctx.stroke()
    this.bob.render(ctx)
  }
}

const windForce = new Vector(0.5, 0)

interface DrawState {
  isWind?: boolean
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
      spring: new SpringMover({
        // mass: 1,
        origin: new Vector(width * 0.5, 0),
        restLen: height * 0.5,
        startPos: new Vector(width * 0.5, height * 0.7),
      }),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      if (drawState.isWind) drawState.spring.bob.applyForce(windForce)
      drawState.spring.bob.gravity()
      drawState.spring.update()
      drawState.spring.render(ctx)
    }}
  />
)
