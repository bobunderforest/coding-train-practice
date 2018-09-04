import * as React from 'react'
import { DemoPage } from 'components/Layout/DemoPage'
import { Vector } from 'components/Vectors/VectorMutable'
import { gravityAttraction } from './GravityAttraction'
import { Mover } from './Mover'
import { random } from 'utils'
import { links } from 'utils/links'

interface DrawState {
  guys: Mover[]
  mouse?: Vector
}

const Page = DemoPage as new () => DemoPage<DrawState>

export const MutalAttraction = () => (
  <Page
    hint="click to create"
    next={links.portDefender}
    srcLink="Forces/MutalAttraction.tsx"
    canvasProps={({ drawState }) => ({
      onMouseDown: () =>
        drawState.mouse &&
        drawState.guys.push(new Mover(drawState.mouse.x, drawState.mouse.y)),
      onMouseMove: e => (drawState.mouse = new Vector(e.pageX, e.pageY)),
    })}
    setup={({ width, height }) => {
      const guys = Array.from(Array(5)).map(() => {
        const initForce = new Vector(random(-1, 1), random(-1, 1))
        const guy = new Mover(random(0, width), random(0, height))
        guy.applyForce(initForce)
        return guy
      })
      return {
        guys,
      }
    }}
    render={({ ctx, width, height, drawState }) => {
      const { guys } = drawState
      guys.forEach(guy => {
        guys.forEach(guy2 => gravityAttraction(guy, guy2))
        guy.edgesLoop(width, height)
        guy.update()
        guy.render(ctx)
      })
    }}
  />
)
