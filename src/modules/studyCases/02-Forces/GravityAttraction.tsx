import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/physics/VectorMutable'
import { Mover } from 'modules/math/physics/MoverWithMass'
import { random, sqr } from 'modules/math'
import { links } from 'modules/appCore/links'
import { colors } from 'modules/styles/styles'

class Attractor {
  pos: Vector
  mass: number = 3

  constructor(x: number, y: number) {
    this.pos = new Vector(x, y)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 10 * this.mass, 0, 360)
    ctx.fillStyle = colors.brandHover
    ctx.strokeStyle = colors.brand
    ctx.lineWidth = 20
    ctx.stroke()
    ctx.fill()
  }
}

export const gravityAttraction = (obj1: Mover | Attractor, obj2: Mover) => {
  // Gravity attraction between `Attractor` and current guy
  const direction = obj1.pos.copy()
  direction.sub(obj2.pos)

  const distance = direction.mag()

  const g = 9.8 * 1000
  let forceMag = (g * obj2.mass * obj1.mass) / sqr(distance)

  if (forceMag > 1) forceMag = 1
  else if (forceMag < 0.01) forceMag = 0.01

  const force = direction.copy()
  force.norm()
  force.mult(forceMag)

  obj2.applyForce(force)
}

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
    srcLink="Forces/GravityAttraction.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () => (drawState.isMoving = true),
      onMouseMove: e => (drawState.mouse = new Vector(e.pageX, e.pageY)),
      onMouseUp: () => (drawState.isMoving = false),
    })}
    setup={({ width, height }) => {
      const guys = Array.from(Array(3)).map(() => {
        const border = height * 0.1
        const avRange = (height - border * 2) / 2
        const range = random(border, avRange)

        const guy = new Mover(width / 2, range)
        const initForce = (avRange - range) / ((1 / guy.mass) * 20)
        guy.applyForce(new Vector(initForce, 0))

        return guy
      })
      return {
        attractor: new Attractor(width / 2, height / 2),
        guys,
      }
    }}
    render={({ ctx, width, height, drawState }) => {
      const { mouse, isMoving, attractor, guys } = drawState

      if (isMoving && mouse) attractor.pos = mouse

      guys.forEach(guy => {
        gravityAttraction(attractor, guy)
        guy.update()
        guy.render(ctx)
      })

      attractor.render(ctx)
    }}
  />
)
