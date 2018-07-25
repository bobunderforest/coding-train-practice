import * as React from 'react'
import { DemoPage } from 'components/Layout/DemoPage'
import { Vector } from 'components/Vectors/VectorMutable'
import { Mover } from './Mover'
import { sqr, random } from 'utils'
import { links } from 'utils/links'
import { colors } from 'utils/styles'

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

interface DrawState {
  attractor: Attractor
  guys: Mover[]
  isMoving?: boolean
  mouse?: Vector
}

const Page = DemoPage as new () => DemoPage<DrawState>

export const GravityAttraction = () => (
  <Page
    hint="click to move attractor"
    next={links.dragResistance}
    srcLink="Forces/GravityAttraction.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () => (drawState.isMoving = true),
      onMouseMove: e => (drawState.mouse = new Vector(e.pageX, e.pageY)),
      onMouseUp: () => (drawState.isMoving = false),
    })}
    setup={({ width, height }) => {
      const guys = Array.from(Array(3)).map(
        () => new Mover(random(0, width), random(0, height)),
      )
      const initForce = new Vector(10, 0)
      guys.forEach(guy => guy.applyForce(initForce))
      return {
        attractor: new Attractor(width / 2, height / 2),
        guys,
      }
    }}
    render={({ ctx, width, height, drawState }) => {
      const { mouse, isMoving, attractor, guys } = drawState

      if (isMoving && mouse) attractor.pos = mouse

      guys.forEach(guy => {
        // Gravity attraction between `Attractor` and current guy
        const direction = attractor.pos.copy()
        direction.sub(guy.pos)

        const distance = direction.mag()

        const g = 9.8 * 1000
        let forceMag = (g * guy.mass * attractor.mass) / sqr(distance)

        if (forceMag > 1) forceMag = 1
        else if (forceMag < 0.01) forceMag = 0.01

        const force = direction.copy()
        force.norm()
        force.mult(forceMag)

        guy.applyForce(force)

        guy.update(width, height)
        guy.render(ctx)
      })

      attractor.render(ctx)
    }}
  />
)
