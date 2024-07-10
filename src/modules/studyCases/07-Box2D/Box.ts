import * as b2 from '@box2d/core'
import { random } from 'lodash'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { Box2DUtil } from './Box2DUtil'

export class Box {
  b2dUtil: Box2DUtil
  size: Vector
  shape: b2.b2PolygonShape
  fillColor: string
  strokeColor: string
  body: b2.b2Body

  constructor(b2dUtil: Box2DUtil, size: Vector, bodyDef: b2.b2BodyDef) {
    this.b2dUtil = b2dUtil
    this.size = size

    // Colors
    this.fillColor = `rgb(${random(200, 255)}, ${random(200, 255)}, ${random(200, 255)})`
    this.strokeColor = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`

    // Create a body
    this.body = b2dUtil.world.CreateBody(bodyDef)

    // Create a shape
    this.shape = new b2.b2PolygonShape()
    this.shape.SetAsBox(this.size.x / 2, this.size.y / 2)

    // Create a fixture
    this.body.CreateFixture({
      shape: this.shape,
      density: 10,
      friction: 0.6,
      restitution: 0.01,
    })
  }

  render(ctx: CanvasRenderingContext2D) {
    const { coords } = this.b2dUtil
    const angle = this.body.GetAngle()
    const posWorld = this.body.GetPosition()
    const { x, y } = coords.worldToScreen(posWorld)
    const w = coords.worldToScreenScalar(this.size.x)
    const h = coords.worldToScreenScalar(this.size.y)
    const wHalf = w / 2
    const hHalf = h / 2

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle * -1)

    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.strokeColor
    ctx.rect(-wHalf, -hHalf, w, h)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = this.strokeColor
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -hHalf)
    ctx.stroke()
    ctx.closePath()

    ctx.restore()
  }
}
