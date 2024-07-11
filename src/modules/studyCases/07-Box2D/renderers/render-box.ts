import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'

export function renderBox(args: {
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
  const wWorld = shape.m_vertices[1].x - shape.m_vertices[0].x
  const hWorld = shape.m_vertices[3].y - shape.m_vertices[0].y

  // Screen values
  const { x, y } = coords.worldToScreen(posWorld)
  const w = coords.worldToScreenScalar(wWorld)
  const h = coords.worldToScreenScalar(hWorld)
  const wHalf = w / 2
  const hHalf = h / 2

  // Draw
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle * -1)

  ctx.lineWidth = 1
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  ctx.beginPath()
  ctx.rect(-wHalf, -hHalf, w, h)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.strokeStyle = strokeColor
  ctx.moveTo(0, 0)
  ctx.lineTo(0, -hHalf)
  ctx.stroke()
  ctx.closePath()

  ctx.restore()
}
