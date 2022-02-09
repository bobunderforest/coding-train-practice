import { Vector } from 'modules/math/vectors/VectorMutable'
import { colors } from 'modules/styles/styles'
import { random } from 'modules/math'

// Force is a `vector` that cause object with mass to `accelerate`
const gravityConst = new Vector(0, 0.98)

export class Mover {
  acc: Vector
  pos: Vector
  vel: Vector
  mass: number

  constructor(x: number, y: number) {
    this.pos = new Vector(x, y)
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

  update() {
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

  edgesLoop(x: number, y: number) {
    const pos = this.pos
    if (pos.x > x) pos.x = 0
    if (pos.x < 0) pos.x = x
    if (pos.y > y) pos.y = 0
    if (pos.y < 0) pos.y = y
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 10 * this.mass, 0, 360)
    ctx.fillStyle = colors.brand
    ctx.fill()
  }
}
