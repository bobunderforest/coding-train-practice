import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/physics/VectorMutable'
import { links } from 'modules/appCore/links'
import { ParticleSystem } from 'modules/math/physics/ParticleSystem'

type DrawState = {
  particles: ParticleSystem
}

export const ParticleSystemPage = () => (
  <PageDemo<DrawState>
    next={links.spring}
    srcLink="06-Particles/ParticleSystem.tsx"
    setup={({ width, height }) => ({
      particles: new ParticleSystem(new Vector(width / 2, height / 4)),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      drawState.particles.update()
      drawState.particles.render(ctx)
    }}
  />
)
