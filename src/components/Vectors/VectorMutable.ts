import { sqr } from 'utils'

export class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  copy() {
    return new Vector(this.x, this.y)
  }

  norm() {
    const mag = this.mag()
    this.x /= mag
    this.y /= mag
  }

  add(b: Vector) {
    this.x += b.x
    this.y += b.y
  }

  sub(b: Vector) {
    this.x -= b.x
    this.y -= b.y
  }

  mag() {
    return Math.sqrt(sqr(this.x) + sqr(this.y))
  }

  setMag(mag: number) {
    this.norm()
    this.x *= mag
    this.y *= mag
  }

  mult(val: number) {
    this.x *= val
    this.y *= val
  }
}
