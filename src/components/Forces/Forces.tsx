import * as React from 'react'
import { DemoPage } from 'components/Layout/DemoPage'
import { FullScreenCanvas } from 'components/Utils/FullScreenCanvas'
import { Vector } from 'components/Vectors/VectorMutable'
import { Mover } from './Mover'
import { random } from 'utils'

const windForce = new Vector(0.5, 0)

interface DrawState {
  guys?: Mover[]
  isWind?: boolean
}

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
            if (!this.drawState.guys) {
              this.drawState.guys = Array.from(Array(6)).map(
                () => new Mover(new Vector(random(90, width - 90), height / 2)),
              )
            }

            this.drawState.guys.forEach(guy => {
              // Wind
              if (this.drawState.isWind) guy.applyForce(windForce)

              // Gravity
              guy.gravity()

              guy.edges(width, height)
              guy.update(width, height)
              guy.render(ctx)
            })
          }}
        />
      </DemoPage>
    )
  }
}
