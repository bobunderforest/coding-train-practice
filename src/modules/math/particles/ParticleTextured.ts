import { BASE_URL } from 'config'
import { random } from 'lodash'
import { Vector } from '../vectors/VectorMutable'
import { Particle } from './Particle'
import { CanvasUtil } from 'modules/canvas/canvas-util'

class Texture {
  w = 0
  h = 0
  img = new Image()
  isLoaded = false

  constructor(path: string) {
    this.img.src = `${BASE_URL}/${path}`
    this.img.onload = () => {
      this.w = this.img.width / 4
      this.h = this.img.height / 4
      this.isLoaded = true
    }
  }
}

const textures = [
  new Texture('explosion/explosion00.png'),
  new Texture('explosion/explosion01.png'),
  new Texture('explosion/explosion02.png'),
  new Texture('explosion/explosion03.png'),
  new Texture('explosion/explosion04.png'),
  new Texture('explosion/explosion05.png'),
  new Texture('explosion/explosion06.png'),
  new Texture('explosion/explosion07.png'),
  new Texture('explosion/explosion08.png'),
]

export class ParticleTextured extends Particle {
  texture: Texture
  totalLifetime = 60

  constructor(canvasUtil: CanvasUtil, pos: Vector) {
    super(canvasUtil, pos)
    this.texture = textures[random(0, textures.length - 1)]
    this.lifespan = this.totalLifetime
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.texture.isLoaded) return
    const { img, w, h } = this.texture
    ctx.save()
    ctx.globalAlpha = this.lifespan / this.totalLifetime
    ctx.globalCompositeOperation = 'screen'
    ctx.drawImage(img, this.pos.x - w / 2, this.pos.y - w / 2, w, h)
    ctx.restore()
  }
}
