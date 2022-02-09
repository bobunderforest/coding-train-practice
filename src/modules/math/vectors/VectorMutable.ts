import { sqr } from 'modules/math'

export class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(b: Vector) {
    this.x += b.x
    this.y += b.y
  }

  sub(b: Vector) {
    this.x -= b.x
    this.y -= b.y
  }

  mult(val: number) {
    this.x *= val
    this.y *= val
  }

  div(val: number) {
    this.x /= val
    this.y /= val
  }

  copy() {
    return new Vector(this.x, this.y)
  }

  mag() {
    return Math.sqrt(sqr(this.x) + sqr(this.y))
  }

  norm() {
    if (this.mag() !== 0) this.div(this.mag())
  }

  setMag(mag: number) {
    this.norm()
    this.mult(mag)
  }

  limit(val: number) {
    if (this.mag() > val) this.setMag(val)
  }
}
