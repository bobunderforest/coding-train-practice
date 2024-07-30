import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'
import { B2dObject } from './B2dObject'
import { renderPolygon } from '../renderers/render-polygon'

export class Surface extends B2dObject {
  verticies: b2.b2Vec2[]
  shape: b2.b2ChainShape

  constructor(b2dutil: Box2DUtil) {
    super(b2dutil, {
      type: b2.b2BodyType.b2_staticBody,
    })

    // Params
    const start = -80
    const end = 80
    const altitude = -25
    const verticiesCount = 120
    const amplitude = 6
    const depth = 100

    // Geometry
    this.verticies = Array.from(Array(verticiesCount + 1)).map((_, i) => {
      const length = end - start
      const step = length / verticiesCount
      return new b2.b2Vec2(
        start + step * i,
        altitude + amplitude * Math.sin(2 * Math.PI + i * 6),
      )
    })
    this.verticies = [
      new b2.b2Vec2(start, altitude - depth),
      ...this.verticies,
      new b2.b2Vec2(end, altitude - depth),
      new b2.b2Vec2(start, altitude - depth),
    ].reverse()

    this.shape = new b2.b2ChainShape()
    this.shape.CreateChain(
      this.verticies,
      this.verticies.length,
      this.verticies[0],
      this.verticies[this.verticies.length - 1],
    )

    this.body.CreateFixture({
      shape: this.shape,
      density: 10,
      friction: 0.6,
      restitution: 0.01,
    })
  }

  render(ctx: CanvasRenderingContext2D) {
    const { coords } = this.b2dutil

    ctx.beginPath()
    const start = coords.worldToScreen(this.verticies[0].x, this.verticies[0].y)
    ctx.moveTo(start.x, start.y)
    for (const v of this.verticies) {
      const vScreen = coords.worldToScreen(v.x, v.y)
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
