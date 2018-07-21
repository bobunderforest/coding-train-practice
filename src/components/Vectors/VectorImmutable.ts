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
    return this.norm().mult(mag)
  }

  mult(val: number) {
    return new Vector(this.x * val, this.y * val)
  }

  limit(val: number) {
    if (this.mag() <= val) {
      return this
    } else {
      return this.setMag(val)
    }
  }
}
