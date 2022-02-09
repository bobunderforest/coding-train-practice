import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { random } from 'modules/math'
import { drawScene, drawCannon } from './drawers'
import { waterResist, Missle, Enemy } from './physics'
import { links } from 'modules/appCore/links'

const WATER_HEIGHT = 200
const GROUND_HEIGHT = WATER_HEIGHT + 5
const GROUND_WIDTH = 200
const RELOAD_TIME = 800

type Cannon = {
  h: number
  pos: Vector
  w: number
}

type DrawState = {
  cannon: Cannon
  enemies: Enemy[]
  fire?: boolean
  missles: Missle[]
  mouse: Vector
  nextSpawn?: number
  reloadStart?: number
}

export const PortDefender = () => (
  <PageDemo<DrawState>
    next={links.harmonicMotion}
    srcLink="03-PortDefender/PortDefender.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () => (drawState.fire = true),
      onMouseMove: e => {
        drawState.mouse.x = e.pageX
        drawState.mouse.y = e.pageY
      },
      style: { cursor: 'crosshair' },
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
    })}
    render={({ ctx, width, height, drawState, time }) => {
      const { mouse, cannon, fire, missles, reloadStart, enemies } = drawState

      const adjY = (x: number) => height - x
      const adjV = (v: Vector) => new Vector(v.x, adjY(v.y))

      const waterH = adjY(WATER_HEIGHT)
      const groundH = adjY(GROUND_HEIGHT)

      // Calc cannon properties
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
        if (!reloadStart || time >= reloadStart + RELOAD_TIME) {
          const newMissle = new Missle(cannonPos)
          newMissle.applyForce(cannonToMouse)
          drawState.missles.push(newMissle)
          drawState.reloadStart = time
        }
        drawState.fire = false
      }

      // Process existing missles
      const misslesToRemove: number[] = []
      missles.forEach((m, i) => {
        if (m.pos.y > waterH) m.applyForce(waterResist(m.vel))
        m.gravity()
        m.update()
        m.render(ctx)
        if (m.pos.y > height) misslesToRemove.push(i)
      })
      misslesToRemove.forEach(i => missles.splice(i, 1))

      // Spawn new enemy
      if (drawState.nextSpawn && drawState.nextSpawn <= time) {
        const newEnemy = new Enemy(width, waterH)
        newEnemy.applyForce(new Vector(-100, 0))
        drawState.enemies.push(newEnemy)
        drawState.nextSpawn = undefined
      }
      if (!drawState.nextSpawn) {
        drawState.nextSpawn = time + random(1000, 4000)
      }

      // Process existing enemy
      const enemiesToRemove: number[] = []
      enemies.forEach((e, i) => {
        if (!e.isDead) {
          missles.forEach(m => {
            // Calc missle collisions
            if (
              m.pos.x > e.pos.x - e.width / 2 &&
              m.pos.x < e.pos.x + e.width / 2 &&
              m.pos.y > e.pos.y - e.height / 2 &&
              m.pos.y < e.pos.y + e.height / 2
            ) {
              e.isDead = true
              m.applyForce(e.vel)
              e.applyForce(m.vel)
              e.applyAngForce(2)
            }
          })
        } else {
          e.gravity()
          e.applyForce(waterResist(e.vel))
        }
        e.update()
        e.render(ctx)
        if (e.pos.y > height || e.pos.x < 0) enemiesToRemove.push(i)
      })
      enemiesToRemove.forEach(i => enemies.splice(i, 1))

      // Draw Scene
      drawScene({
        GROUND_WIDTH,
        WATER_HEIGHT,
        ctx,
        groundH,
        height,
        waterH,
        width,
      })

      // Draw Cannon
      drawCannon({
        GROUND_HEIGHT,
        angle,
        cannon,
        cannonPos,
        cannonToMouse,
        ctx,
      })
    }}
  />
)
