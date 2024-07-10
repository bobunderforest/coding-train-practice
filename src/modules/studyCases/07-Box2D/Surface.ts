import * as b2 from '@box2d/core'
import { Box2DUtil } from './Box2DUtil'
import { random } from 'modules/math'

export class Surface {
  b2dutil: Box2DUtil
  verticies: b2.b2Vec2[]
  fillColor: string
  strokeColor: string

  constructor(b2dutil: Box2DUtil) {
    const start = -600
    const end = 600
    const altitude = -150
    const verticiesCount = 120
    const amplitude = 30

    // Colors
    this.fillColor = `rgb(${random(200, 255)}, ${random(200, 255)}, ${random(200, 255)})`
    this.strokeColor = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`

    // Geometry
    this.b2dutil = b2dutil
    this.verticies = Array.from(Array(verticiesCount + 1)).map((_, i) => {
      const length = end - start
      const step = length / verticiesCount
      return new b2.b2Vec2(
        start + step * i,
        altitude + amplitude * Math.sin(2 * Math.PI + i * 6),
      )
    })
    this.verticies = [
      new b2.b2Vec2(start, altitude - 200),
      ...this.verticies,
      new b2.b2Vec2(end, altitude - 200),
      new b2.b2Vec2(start, altitude - 200),
    ].reverse()

    const shape = new b2.b2ChainShape()
    shape.CreateChain(
      this.verticies,
      this.verticies.length,
      this.verticies[0],
      this.verticies[this.verticies.length - 1],
    )

    const body = b2dutil.world.CreateBody({
      type: b2.b2BodyType.b2_staticBody,
    })
    body.CreateFixture({
      shape,
      density: 10,
      friction: 0.6,
      restitution: 0.01,
    })
  }

  render(ctx: CanvasRenderingContext2D) {
    const { coords } = this.b2dutil

    ctx.beginPath()
    const start = coords.worldToScreen(this.verticies[0])
    ctx.moveTo(start.x, start.y)
    for (const v of this.verticies) {
      const vScreen = coords.worldToScreen(v)
      ctx.lineTo(vScreen.x, vScreen.y)
    }
    ctx.lineWidth = 1
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.strokeColor
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
  }
}
