import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { links } from 'modules/appCore/links'
import { ParticleRound } from 'modules/math/particles/ParticleRound'
import { ParticleSquare } from 'modules/math/particles/ParticleSquare'
import { ParticleSystem } from 'modules/math/particles/ParticleSystem'
import { Repeller } from 'modules/math/particles/Repeller'

const GRAVITY_FORCE = new Vector(0, 0.04)
const WIND_FORCE = new Vector(0.1, 0)

type DrawState = {
  isWind: boolean
  repeller: Repeller
  particlesRound: ParticleSystem
  particlesSquare: ParticleSystem
  particlesMouse: ParticleSystem
}

export const ParticleSystemPage = () => (
  <PageDemo<DrawState>
    next={links.texturedParticles}
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
    setup={({ canvasUtil }) => {
      const { width, height } = canvasUtil
      return {
        isWind: false,
        repeller: new Repeller(new Vector(width / 3 + 60, height / 4 + 140)),
        particlesRound: new ParticleSystem(
          canvasUtil,
          new Vector(width / 3, height / 4),
          [ParticleRound],
        ),
        particlesSquare: new ParticleSystem(
          canvasUtil,
          new Vector((width / 3) * 2, height / 4),
          [ParticleSquare],
        ),
        particlesMouse: new ParticleSystem(
          canvasUtil,
          new Vector(width / 2, height / 4),
          [ParticleSquare, ParticleRound],
        ),
      }
    }}
    render={({ canvasUtil, drawState }) => {
      const { ctx } = canvasUtil

      const systems = [
        drawState.particlesRound,
        drawState.particlesSquare,
        drawState.particlesMouse,
      ]

      drawState.repeller.render(ctx)

      for (const system of systems) {
        system.applyForce(GRAVITY_FORCE)
        if (drawState.isWind) system.applyForce(WIND_FORCE)
        system.applyRepel(drawState.repeller)
        system.update()
        system.render(ctx)
      }
    }}
  />
)
