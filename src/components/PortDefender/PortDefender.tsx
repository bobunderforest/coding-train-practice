import * as React from 'react'
import { DemoPage } from '../Layout/DemoPage'
import { Vector } from '../Vectors/VectorMutable'
import { Mover } from '../Forces/Mover'
import { random, sqr } from 'utils'
// import { links } from 'utils/links'

// const windForce = new Vector(0.5, 0)

const WATER_HEIGHT = 200
const GROUND_HEIGHT = WATER_HEIGHT + 5
const GROUND_WIDTH = 200

class Missle extends Mover {
  constructor(pos: Vector) {
    super(pos.x, pos.y)
    this.mass = 10
  }

  applyWaterResistance() {
    const coeff = -0.005
    const drag = this.vel.copy()
    const speed = this.vel.mag()
    drag.mult(coeff * sqr(speed))
    this.applyForce(drag)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 15, 0, 360)
    ctx.fillStyle = '#000'
    ctx.fill()
  }
}

class Enemy extends Mover {
  constructor(pos: Vector) {
    super(pos.x, pos.y)
    this.mass = 20
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 15, 0, 360)
    ctx.fillStyle = '#ee3'
    ctx.fill()
  }
}

interface Cannon {
  h: number
  pos: Vector
  w: number
}

interface DrawState {
  cannon: Cannon
  enemies: Enemy[]
  fire?: boolean
  missles: Missle[]
  mouse: Vector
  nextSpawn?: number
}

const Page = DemoPage as new () => DemoPage<DrawState>

export const PortDefender = () => (
  <Page
    // next={links.dragResistance}
    srcLink="PortDefender/PortDefender.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () => (drawState.fire = true),
      onMouseMove: e => {
        drawState.mouse.x = e.pageX
        drawState.mouse.y = e.pageY
      },
      style: { cursor: 'crosshair' },
      // onMouseUp: () => (drawState.isWind = false),
    })}
    setup={({ width, height }) => ({
      cannon: {
        h: 30,
        pos: new Vector(GROUND_WIDTH / 2, GROUND_HEIGHT + 30),
        w: 60,
      },
      enemies: [],
      missles: [],
      mouse: new Vector(width / 2, height / 2),
      // guys: Array.from(Array(6)).map(
      //   () => new Mover(random(90, width - 90), height / 2),
      // ),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      const { mouse, cannon, fire, missles } = drawState

      const adjY = (x: number) => height - x
      const adjV = (v: Vector) => new Vector(v.x, adjY(v.y))

      const waterH = adjY(WATER_HEIGHT)
      const groundH = adjY(GROUND_HEIGHT)

      // Calc Cannon
      const cannonPos = adjV(cannon.pos)

      const cannonToMouse = mouse.copy()
      cannonToMouse.sub(cannonPos)
      let angle = Math.atan(cannonToMouse.y / cannonToMouse.x)

      if (cannonToMouse.y > 0) {
        cannonToMouse.y = 0
        angle = 0
      }
      if (cannonToMouse.x < 0) {
        cannonToMouse.x = 0
        angle = (-90 * Math.PI) / 180
      }
      if (cannonToMouse.mag() < 150) cannonToMouse.setMag(150)
      if (cannonToMouse.mag() > 350) cannonToMouse.setMag(350)

      // Fire
      if (fire) {
        const newMissle = new Missle(cannonPos)
        newMissle.applyForce(cannonToMouse)
        drawState.missles.push(newMissle)
        drawState.fire = false
      }

      const toRemove: number[] = []
      drawState.missles.forEach((m, i) => {
        if (m.pos.y > waterH) m.applyWaterResistance()
        m.gravity()
        m.update(width, height)
        m.render(ctx)
        if (m.pos.y > height) toRemove.push(i)
      })
      toRemove.forEach(i => missles.splice(i, 1))

      // Enemies
      if (!drawState.nextSpawn) drawState.nextSpawn = random(100, 400)

      // Draw Scene
      ctx.fillStyle = '#dd3'
      ctx.fillRect(0, groundH, GROUND_WIDTH, 10)

      ctx.fillStyle = '#533'
      ctx.fillRect(0, waterH + 5, GROUND_WIDTH, height)

      ctx.globalAlpha = 0.6
      ctx.fillStyle = '#46d'
      ctx.fillRect(GROUND_WIDTH, waterH, width - GROUND_WIDTH, WATER_HEIGHT)
      ctx.globalAlpha = 1

      // Prepare to draw cannon
      ctx.save()
      ctx.translate(cannonPos.x, cannonPos.y)

      // Draw Line
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(cannonToMouse.x, cannonToMouse.y)
      ctx.strokeStyle = '#f77'
      ctx.lineWidth = 20
      ctx.globalAlpha = 0.1
      ctx.stroke()
      ctx.globalAlpha = 1

      // Draw Cannon
      ctx.save()
      ctx.rotate(angle)
      ctx.fillStyle = '#222'
      ctx.fillRect(-20, -(cannon.h / 2), cannon.w, cannon.h)
      ctx.fillRect(-25, -4, 6, 9)
      ctx.restore()

      const holderH = cannon.pos.y - GROUND_HEIGHT + 5
      ctx.fillStyle = '#333'
      ctx.fillRect(-5, -5, 10, holderH)
      ctx.fillRect(-30, holderH - 5, 60, 10)

      ctx.restore()
    }}
  />
)
