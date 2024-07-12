export function renderPoint(
  ctx: CanvasRenderingContext2D,
  point: { x: number; y: number },
  fillColor: string,
) {
  ctx.save()
  ctx.fillStyle = fillColor
  ctx.beginPath()
  ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
  ctx.restore()
}
