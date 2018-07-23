import { Vector } from 'components/Vectors/VectorMutable'
import { colors } from 'utils/styles'
import { random } from 'utils'

// Force is a `vector` that cause object with mass to `accelerate`
const gravityConst = new Vector(0, 1)

export class Mover {
  acc: Vector
  pos: Vector
  vel: Vector
  mass: number

  constructor(pos: Vector) {
    this.pos = pos
    this.acc = new Vector(0, 0)
    this.vel = new Vector(0, 0)
    this.mass = random(1, 4)
  }

  applyForce(f: Vector) {
    // Applied force should be divided by mass of the object
    const divM = f.copy()
    divM.div(this.mass)
    // Accomulate force to acceleration
    this.acc.add(divM)
  }

  gravity() {
    // Gravity is a special force because
    // object mass dont affects it
    // Muiltipy it with mass, so when it will be divided
    // it will be the same
    const gravityForce = gravityConst.copy()
    gravityForce.mult(this.mass)
    this.applyForce(gravityForce)
  }

  update(x: number, y: number) {
    // Apply acc to velocity and velocity to position
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    // Clear acceleration before next frame
    this.acc = new Vector(0, 0)
  }

  edges(x: number, y: number) {
    const pos = this.pos
    const vel = this.vel
    if (pos.x > x) {
      pos.x = x
      vel.x *= -1
    }

    if (pos.x < 0) {
      pos.x = 0
      vel.x *= -1
    }

    if (pos.y > y) {
      pos.y = y
      vel.y *= -1
    }

    if (pos.y < 0) {
      pos.y = 0
      vel.y *= -1
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 20 * this.mass, 0, 360)
    ctx.fillStyle = colors.brand
    ctx.fill()
  }
}
