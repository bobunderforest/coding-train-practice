import { PageDemo } from 'modules/pages/PageDemo'
import { Vector } from 'modules/math/vectors/VectorMutable'
import { links } from 'modules/appCore/links'
import { ParticleTextured } from 'modules/math/particles/ParticleTextured'
import { ParticleSystem } from 'modules/math/particles/ParticleSystem'

type DrawState = {
  mouse: Vector
  particles: ParticleSystem
}

export const TexturedParticle = () => (
  <PageDemo<DrawState>
    next={links.texturedParticles}
    srcLink="06-Particles/TexturedParticle.tsx"
    canvasProps={({ drawState }) => ({
      onMouseMove: e => {
        drawState.mouse.x = e.pageX
        drawState.mouse.y = e.pageY
      },
    })}
    setup={({ width, height }) => ({
      mouse: new Vector(0, 0),
      particles: new ParticleSystem(new Vector(width / 2, (height / 6) * 5), [
        ParticleTextured,
      ]),
    })}
    render={({ ctx, width, height, drawState, time }) => {
      const mouseForce = drawState.mouse.copy()
      mouseForce.sub(drawState.particles.pos)
      mouseForce.setMag(0.15)
      drawState.particles.applyForce(mouseForce)
      drawState.particles.update()
      drawState.particles.render(ctx)
    }}
  />
)
