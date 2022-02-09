import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { links } from 'modules/appCore/links'
import { ParticleRound } from 'modules/math/particles/ParticleRound'
import { ParticleSquare } from 'modules/math/particles/ParticleSquare'
import { ParticleSystem } from 'modules/math/particles/ParticleSystem'

type DrawState = {
  particlesRound: ParticleSystem
  particlesSquare: ParticleSystem
  particlesMouse: ParticleSystem
}

export const ParticleSystemPage = () => (
  <PageDemo<DrawState>
    next={links.spring}
    srcLink="06-Particles/ParticleSystem.tsx"
    canvasProps={({ drawState }) => ({
      onMouseMove: e => {
        drawState.particlesMouse.pos.x = e.pageX
        drawState.particlesMouse.pos.y = e.pageY
      },
    })}
    setup={({ width, height }) => ({
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
      drawState.particlesRound.update()
      drawState.particlesSquare.update()
      drawState.particlesMouse.update()

      drawState.particlesRound.render(ctx)
      drawState.particlesSquare.render(ctx)
      drawState.particlesMouse.render(ctx)
    }}
  />
)
