import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Mover } from 'modules/math/physics/MoverWithMass'
import { links } from 'modules/appCore/links'

type SpringArgs = {
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

type DrawState = {
  isWind?: boolean
  bob: Mover
  spring: SpringMover
}

export const Spring = () => (
  <PageDemo<DrawState>
    next={links.particleSystem}
    hint="click for wind"
    srcLink="05-Pendulum/Spring.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () => (drawState.isWind = true),
      onMouseUp: () => (drawState.isWind = false),
    })}
    setup={({ canvasUtil }) => {
      const { width, height } = canvasUtil
      return {
        bob: new Mover(canvasUtil, width * 0.5, height * 0.7),
        spring: new SpringMover({
          anchor: new Vector(width * 0.5, 0),
          restLen: height * 0.5,
        }),
      }
    }}
    render={({ canvasUtil, drawState }) => {
      const { ctx } = canvasUtil

      drawState.bob.gravity()
      if (drawState.isWind) drawState.bob.applyForce(windForce)

      drawState.spring.connect(drawState.bob)
      drawState.bob.update()

      drawState.spring.render(ctx, drawState.bob.pos)
      drawState.bob.render(ctx)
    }}
  />
)
