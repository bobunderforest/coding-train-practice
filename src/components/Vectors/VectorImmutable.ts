import { sqr } from 'utils'

export class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(b: Vector) {
    return new Vector(this.x + b.x, this.y + b.y)
  }

  sub(b: Vector) {
    return new Vector(this.x - b.x, this.y - b.y)
  }

  mult(val: number) {
    return new Vector(this.x * val, this.y * val)
  }

  div(val: number) {
    return new Vector(this.x / val, this.y / val)
  }

  copy() {
    return new Vector(this.x, this.y)
  }

  mag() {
    return Math.sqrt(sqr(this.x) + sqr(this.y))
  }

  norm() {
    return this.div(this.mag())
  }

  setMag(mag: number) {
    return this.norm().mult(mag)
  }

  limit(val: number) {
    if (this.mag() <= val) {
      return this
    } else {
      return this.setMag(val)
    }
  }
}
