import * as b2 from '@box2d/core'
import { Box2DUtil } from '../box2d-utils/Box2DUtil'

export function renderCircle(args: {
  ctx: CanvasRenderingContext2D
  b2dutil: Box2DUtil
  body: b2.b2Body
  shape: b2.b2CircleShape
  fillColor: string
  strokeColor: string
}) {
  const { ctx, shape, body, b2dutil, fillColor, strokeColor } = args
  const { coords } = b2dutil

  // World values
  const angle = body.GetAngle()
  const posWorld = body.GetPosition()
  const rWorld = shape.m_radius

  // Screen values
  const { x, y } = coords.worldToScreen(posWorld)
  const offsetX = coords.worldToScreenScalar(shape.m_p.x)
  const offsetY = coords.worldToScreenScalar(shape.m_p.y)
  const r = coords.worldToScreenScalar(rWorld)

  // Draw
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle * -1)

  ctx.lineWidth = 1
  ctx.fillStyle = fillColor
  ctx.strokeStyle = strokeColor
  ctx.beginPath()
  ctx.arc(offsetX, -offsetY, r, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.strokeStyle = strokeColor
  ctx.moveTo(offsetX, -offsetY)
  ctx.lineTo(offsetX, -r - offsetY)
  ctx.stroke()
  ctx.closePath()

  ctx.restore()
}
