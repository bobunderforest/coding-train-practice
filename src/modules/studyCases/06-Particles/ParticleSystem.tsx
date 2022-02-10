import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { links } from 'modules/appCore/links'
import { ParticleRound } from 'modules/math/particles/ParticleRound'
import { ParticleSquare } from 'modules/math/particles/ParticleSquare'
import { ParticleSystem } from 'modules/math/particles/ParticleSystem'

const GRAVITY_FORCE = new Vector(0, 0.04)
const WIND_FORCE = new Vector(0.1, 0)

type DrawState = {
  isWind: boolean
  particlesRound: ParticleSystem
  particlesSquare: ParticleSystem
  particlesMouse: ParticleSystem
}

export const ParticleSystemPage = () => (
  <PageDemo<DrawState>
    next={links.spring}
    hint="click for wind"
    srcLink="06-Particles/ParticleSystem.tsx"
    canvasProps={({ drawState }) => ({
      onMouseMove: e => {
        drawState.particlesMouse.pos.x = e.pageX
        drawState.particlesMouse.pos.y = e.pageY
      },
      onMouseDown: () => (drawState.isWind = true),
      onMouseUp: () => (drawState.isWind = false),
    })}
    setup={({ width, height }) => ({
      isWind: false,
      particlesRound: new ParticleSystem(new Vector(width / 3, height / 4), [
        ParticleRound,
      ]),
      particlesSquare: new ParticleSystem(
        new Vector((width / 3) * 2, height / 4),
        [ParticleSquare],
      ),
      particlesMouse: new ParticleSystem(new Vector(width / 2, height / 4), [
        ParticleSquare,
        ParticleRound,
      ]),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      const systems = [
        drawState.particlesRound,
        drawState.particlesSquare,
        drawState.particlesMouse,
      ]

      for (const system of systems) {
        system.applyForce(GRAVITY_FORCE)
        if (drawState.isWind) system.applyForce(WIND_FORCE)
        system.update()
        system.render(ctx)
      }
    }}
  />
)
