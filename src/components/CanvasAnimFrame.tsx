import * as React from 'react'

// Typings
export interface RenderArgs {
  ctx: CanvasRenderingContext2D
  prevTime: number
  time: number
}

interface CanvasAnimFrameProps
  extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  height: number
  render: (args: RenderArgs) => void
  width: number
}

interface CanvasAnimFrameState {}

// Component
export class CanvasAnimFrame extends React.PureComponent<
  CanvasAnimFrameProps,
  CanvasAnimFrameState
> {
  private canvas: HTMLCanvasElement | null = null
  private ctx: CanvasRenderingContext2D
  private prevTime: number
  private rafID: number
  private scale: number = 1

  componentDidMount() {
    this.rafID = window.requestAnimationFrame(this.renderFrame)
    if (typeof window.devicePixelRatio === 'number') {
      this.scale = window.devicePixelRatio
    }
    this.setCanvasSize()
  }

  componentDidUpdate(prevProps: CanvasAnimFrameProps) {
    if (
      prevProps.height !== this.props.height ||
      prevProps.width !== this.props.width
    ) {
      this.setCanvasSize()
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.rafID)
  }

  getContext() {
    if (this.ctx || !this.canvas) return this.ctx
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    return this.ctx
  }

  setCanvasSize() {
    if (!this.canvas) return
    const { height, width } = this.props
    this.canvas.style.height = height + 'px'
    this.canvas.style.width = width + 'px'
    this.canvas.height = height * this.scale
    this.canvas.width = width * this.scale
  }

  renderFrame = (time: number) => {
    const ctx = this.getContext()
    ctx.save()
    if (this.scale !== 1) ctx.scale(this.scale, this.scale)
    ctx.imageSmoothingEnabled = true
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    this.props.render({
      ctx,
      prevTime: this.prevTime,
      time: time,
    })
    ctx.restore()
    this.prevTime = time
    this.rafID = window.requestAnimationFrame(this.renderFrame)
  }

  render() {
    const { render, width, height, ...restProps } = this.props
    return <canvas ref={el => (this.canvas = el)} {...restProps} />
  }
}
