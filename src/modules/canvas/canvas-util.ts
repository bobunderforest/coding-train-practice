import { EventEmitter } from 'modules/utils/event-subscription'
import { requestAnimationFrame } from 'modules/utils/animation-frame'

export class CanvasUtil {
  readonly FPS_TIME_60 = 1000 / 60

  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  rafID: number | null = null

  pixelRatio: number = 0
  width: number = 0
  height: number = 0
  widthRated: number = 0
  heightRated: number = 0

  isActive: boolean = true
  nowTime: number = 0
  prevTime: number = 0
  deltaTime: number = 0

  eventInit: EventEmitter<{ canvasUtil: CanvasUtil }>
  eventRender: EventEmitter<{ canvasUtil: CanvasUtil }>

  constructor(args: { canvas: HTMLCanvasElement }) {
    this.eventInit = new EventEmitter()
    this.eventRender = new EventEmitter()

    this.canvas = args.canvas
    this.ctx = args.canvas.getContext('2d') as CanvasRenderingContext2D
    this.ctx.imageSmoothingEnabled = true
  }

  initialize = (args: { width: number; height: number }) => {
    this.pixelRatio = window.devicePixelRatio
      ? Math.max(Number(window.devicePixelRatio), 1)
      : 1

    this.width = args.width
    this.height = args.height

    this.widthRated = this.width * this.pixelRatio
    this.heightRated = this.height * this.pixelRatio

    this.canvas.width = this.widthRated
    this.canvas.height = this.heightRated
    this.canvas.style.width = this.width + 'px'
    this.canvas.style.height = this.height + 'px'

    this.eventInit.fire({ canvasUtil: this })

    document.addEventListener('visibilitychange', () => {
      const isPaused = document.visibilityState !== 'visible'
      if (isPaused) {
        this.disable()
      } else {
        this.enable()
      }
    })
  }

  fpsAdjust = (num: number) => {
    const adjustCoeff = (num * this.deltaTime) / this.FPS_TIME_60
    return adjustCoeff
  }

  executeFrame = () => {
    if (!this.isActive) return

    this.prevTime = this.nowTime
    this.nowTime = Date.now()
    this.deltaTime = this.nowTime - this.prevTime

    if (this.prevTime !== 0 && this.deltaTime !== 0) {
      const { ctx, pixelRatio, width, height } = this
      ctx.save()
      if (pixelRatio !== 1) ctx.scale(pixelRatio, pixelRatio)
      ctx.clearRect(0, 0, width, height)
      this.eventRender.fire({ canvasUtil: this })
      ctx.restore()
    }

    this.rafID = requestAnimationFrame(this.executeFrame)
  }

  enable = () => {
    this.isActive = true
    this.rafID = requestAnimationFrame(this.executeFrame)
  }

  disable = () => {
    this.isActive = false
    this.prevTime = 0
    this.nowTime = 0
    this.deltaTime = 0
    if (this.rafID !== null) {
      cancelAnimationFrame(this.rafID)
      this.rafID = null
    }
  }
}
