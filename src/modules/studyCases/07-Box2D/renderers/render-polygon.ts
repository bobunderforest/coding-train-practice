import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'

export function renderPolygon(args: {
  ctx: CanvasRenderingContext2D
  b2dutil: Box2DUtil
  body: b2.b2Body
  shape: b2.b2PolygonShape
  fillColor: string
  strokeColor: string
}) {
  const { ctx, shape, body, b2dutil, fillColor, strokeColor } = args
  const { coords } = b2dutil

  // World values
  const angle = body.GetAngle()
  const posWorld = body.GetPosition()
  const vertices = shape.m_vertices

  // Screen values
  const { x, y } = coords.worldToScreen(posWorld.x, posWorld.y)

  // Draw
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(1, -1)
  ctx.rotate(angle)

  ctx.beginPath()
  const start = coords.worldToScreenVector(vertices[0].x, vertices[0].y)
  ctx.moveTo(start.x, start.y)
  for (const v of vertices) {
    const vScreen = coords.worldToScreenVector(v.x, v.y)
    ctx.lineTo(vScreen.x, vScreen.y)
  }
  ctx.lineTo(start.x, start.y)
  ctx.closePath()

  ctx.lineWidth = 1
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  ctx.fill()
  ctx.stroke()

  ctx.restore()
}
