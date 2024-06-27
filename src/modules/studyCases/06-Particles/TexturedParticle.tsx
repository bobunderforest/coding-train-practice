import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { links } from 'modules/appCore/links'
import { ParticleTextured } from 'modules/math/particles/ParticleTextured'
import { ParticleSystem } from 'modules/math/particles/ParticleSystem'

type DrawState = {
  particles: ParticleSystem
}

export const TexturedParticle = () => (
  <PageDemo<DrawState>
    next={links.box2d}
    srcLink="06-Particles/TexturedParticle.tsx"
    setup={({ canvasUtil }) => {
      const { width, height } = canvasUtil
      return {
        mouse: new Vector(0, 0),
        particles: new ParticleSystem(
          canvasUtil,
          new Vector(width / 2, (height / 6) * 5),
          [ParticleTextured],
        ),
      }
    }}
    render={({ canvasUtil, drawState }) => {
      const { ctx } = canvasUtil
      const { mouse } = drawState
      if (mouse) {
        const mouseForce = mouse
          .copy()
          .sub(drawState.particles.pos)
          .setMag(0.15)
        drawState.particles.applyForce(mouseForce)
      }
      drawState.particles.update()
      drawState.particles.render(ctx)
    }}
  />
)
