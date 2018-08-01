import { Vector } from '../Vectors/VectorMutable'

interface DrawShipProps {
  ang: number
  ctx: CanvasRenderingContext2D
  height: number
  isDead: boolean
  pos: Vector
  width: number
}
export const drawShip = ({ ctx, ...p }: DrawShipProps) => {
  ctx.save()
  ctx.beginPath()

  ctx.fillStyle = p.isDead ? '#611' : '#e33'

  ctx.translate(p.pos.x, p.pos.y)
  ctx.rotate((p.ang * Math.PI) / 180)

  const top = -2 * (p.height / 3)
  ctx.moveTo(-p.width / 2, top)
  ctx.lineTo(-p.width / 4, p.height / 3)
  ctx.lineTo(p.width / 2, p.height / 3)
  ctx.lineTo(p.width / 2, top)

  // Cabin
  ctx.lineTo(p.width / 2 - 10, top)
  ctx.lineTo(p.width / 2 - 10, top - 5)
  ctx.lineTo(0, top - 10)
  ctx.lineTo(0, top + 5)

  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

interface DrawSceneProps {
  ctx: CanvasRenderingContext2D
  GROUND_WIDTH: number
  groundH: number
  height: number
  WATER_HEIGHT: number
  waterH: number
  width: number
}
export const drawScene = ({ ctx, ...p }: DrawSceneProps) => {
  ctx.fillStyle = '#dd3'
  ctx.fillRect(0, p.groundH, p.GROUND_WIDTH, 10)

  ctx.fillStyle = '#533'
  ctx.fillRect(0, p.waterH + 5, p.GROUND_WIDTH, p.height)

  ctx.globalAlpha = 0.6
  ctx.fillStyle = '#46d'
  ctx.fillRect(
    p.GROUND_WIDTH,
    p.waterH,
    p.width - p.GROUND_WIDTH,
    p.WATER_HEIGHT,
  )
  ctx.globalAlpha = 1
}

interface DrawCannonProps {
  angle: number
  cannon: { w: number; h: number; pos: Vector }
  cannonPos: Vector
  cannonToMouse: Vector
  ctx: CanvasRenderingContext2D
  GROUND_HEIGHT: number
}
export const drawCannon = ({ ctx, ...p }: DrawCannonProps) => {
  // Prepare to draw cannon
  ctx.save()
  ctx.translate(p.cannonPos.x, p.cannonPos.y)

  // Draw Line
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(p.cannonToMouse.x, p.cannonToMouse.y)
  ctx.strokeStyle = '#f77'
  ctx.lineWidth = 20
  ctx.globalAlpha = 0.1
  ctx.stroke()
  ctx.globalAlpha = 1

  // Draw Cannon
  ctx.save()
  ctx.rotate(p.angle)
  ctx.fillStyle = '#222'
  ctx.fillRect(-20, -(p.cannon.h / 2), p.cannon.w, p.cannon.h)
  ctx.fillRect(-25, -4, 6, 9)
  ctx.restore()

  const holderH = p.cannon.pos.y - p.GROUND_HEIGHT + 5
  ctx.fillStyle = '#333'
  ctx.fillRect(-5, -5, 10, holderH)
  ctx.fillRect(-30, holderH - 5, 60, 10)

  ctx.restore()
}
