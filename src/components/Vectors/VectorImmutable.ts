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
    return new Vector(this.x / mag, this.y / mag)
  }

  add(b: Vector) {
    return new Vector(this.x + b.x, this.y + b.y)
  }

  sub(b: Vector) {
    return new Vector(this.x - b.x, this.y - b.y)
  }

  mag() {
    return Math.sqrt(sqr(this.x) + sqr(this.y))
  }

  setMag(mag: number) {
    const norm = this.norm()
    return new Vector(norm.x * mag, norm.y * mag)
  }

  mult(val: number) {
    return new Vector(this.x * val, this.y * val)
  }
}
