import { Vector } from 'modules/math/vectors/VectorMutable'
import { Mover } from 'modules/math/physics/MoverWithMass'
import { sqr } from 'modules/math'
import { colors } from 'modules/styles/styles'
import { CanvasUtil } from 'modules/canvas/canvas-util'

export class Attractor {
  canvasUtil: CanvasUtil
  pos: Vector
  mass: number = 3

  constructor(canvasUtil: CanvasUtil, x: number, y: number) {
    this.canvasUtil = canvasUtil
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
