import * as React from 'react'
import { DemoPage } from 'components/Layout/DemoPage'
import { FullScreenCanvas } from 'components/Utils/FullScreenCanvas'
import { Vector } from 'components/Vectors/VectorMutable'
import { colors } from 'utils/styles'

// Force is a `vector` that cause object with mass to `accelerate`

export class Mover {
  acc: Vector
  pos: Vector
  vel: Vector

  constructor(pos: Vector) {
    this.pos = pos
    this.acc = new Vector(0, 0)
    this.vel = new Vector(0, 0)
  }

  update(x: number, y: number) {
    this.edges(x, y)
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc = new Vector(0, 0)
  }

  applyForce(f: Vector) {
    this.acc.add(f)
  }

  edges(x: number, y: number) {
    const pos = this.pos
    const vel = this.vel
    if (pos.x > x) {
      pos.x = x
      vel.x *= -1
    }

    if (pos.x < 0) {
      pos.x = 0
      vel.x *= -1
    }

    if (pos.y > y) {
      pos.y = y
      vel.y *= -1
    }

    if (pos.y < 0) {
      pos.y = 0
      vel.y *= -1
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, 20, 0, 360)
    ctx.fillStyle = colors.brand
    ctx.fill()
  }
}

interface DrawState {
  mrBall?: Mover
  isWind?: boolean
}

const gravityForce = new Vector(0, 1)
const windForce = new Vector(0.5, 0)

export class Forces extends React.PureComponent<{}> {
  drawState: DrawState = {}
  render() {
    return (
      <DemoPage
        hint="click for wind"
        srcLink="https://github.com/manneredboor/coding-train-practice/blob/master/src/components/Forces/Forces.tsx"
      >
        <FullScreenCanvas
          onMouseDown={() => {
            this.drawState.isWind = true
          }}
          onMouseUp={() => {
            this.drawState.isWind = false
          }}
          render={({ ctx, width, height }) => {
            if (!this.drawState.mrBall) {
              this.drawState.mrBall = new Mover(
                new Vector(width / 2, height / 2),
              )
            }

            const { mrBall } = this.drawState

            mrBall.applyForce(gravityForce)

            if (this.drawState.isWind) mrBall.applyForce(windForce)

            mrBall.update(width, height)
            mrBall.render(ctx)
          }}
        />
      </DemoPage>
    )
  }
}
