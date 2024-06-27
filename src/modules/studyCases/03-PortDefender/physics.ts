import { Vector } from 'modules/math/vectors/VectorMutable'
import { Mover } from 'modules/math/physics/MoverWithMass'
import { sqr } from 'modules/math'
import { drawShip } from './drawers'
import type { CanvasUtil } from 'modules/canvas/canvas-util'

export const waterResist = (vel: Vector) => {
  const coeff = -0.005
  const drag = vel.copy()
  const speed = vel.mag()
  drag.mult(coeff * sqr(speed))
  return drag
}

export class Missle extends Mover {
  constructor(canvasUtil: CanvasUtil, pos: Vector) {
    super(canvasUtil, pos.x, pos.y)
    this.mass = 10
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 15, 0, 360)
    ctx.fillStyle = '#000'
    ctx.fill()
  }
}

export class Enemy extends Mover {
  width: number = 120
  height: number = 40
  isDead: boolean = false

  ang: number = 0
  angVel: number = 0
  angAcc: number = 0

  constructor(canvasUtil: CanvasUtil, x: number, y: number) {
    super(canvasUtil, x, y)
    this.mass = 30
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc = new Vector(0, 0)

    this.angVel += this.angAcc
    this.ang += this.angVel
    this.angAcc = 0
  }

  applyAngForce(f: number) {
    this.angAcc += f
  }

  render(ctx: CanvasRenderingContext2D) {
    drawShip({
      ang: this.ang,
      ctx,
      height: this.height,
      isDead: this.isDead,
      pos: this.pos,
      width: this.width,
    })
  }
}
