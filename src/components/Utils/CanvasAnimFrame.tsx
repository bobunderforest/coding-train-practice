import * as React from 'react'
import isBrowser from 'is-in-browser'

// Typings
export interface RenderArgs {
  ctx: CanvasRenderingContext2D
  height: number
  prevTime: number
  time: number
  width: number
}

export interface CanvasAnimFrameProps
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
  private canvas: React.RefObject<HTMLCanvasElement> = React.createRef()
  private ctx: CanvasRenderingContext2D
  private prevTime: number
  private rafID: number
  private scale: number =
    isBrowser && typeof window.devicePixelRatio === 'number'
      ? window.devicePixelRatio
      : 1

  componentDidMount() {
    this.rafID = window.requestAnimationFrame(this.renderFrame)
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.rafID)
  }

  getContext() {
    if (this.ctx || !this.canvas.current) return this.ctx
    this.ctx = this.canvas.current.getContext('2d') as CanvasRenderingContext2D
    return this.ctx
  }

  renderFrame = (time: number) => {
    const { height, width } = this.props
    if (this.canvas.current && width && height) {
      const ctx = this.getContext()
      ctx.save()
      if (this.scale !== 1) ctx.scale(this.scale, this.scale)
      ctx.imageSmoothingEnabled = true
      ctx.clearRect(0, 0, width, height)
      this.props.render({
        ctx,
        height,
        prevTime: this.prevTime,
        time: time,
        width,
      })
      ctx.restore()
      this.prevTime = time
    }
    this.rafID = window.requestAnimationFrame(this.renderFrame)
  }

  render() {
    const { render, width, height, ...restProps } = this.props
    return (
      <canvas
        style={{
          display: 'block',
          height: height || '100%',
          width: width || '100%',
        }}
        height={height * this.scale || ''}
        width={width * this.scale || ''}
        ref={this.canvas}
        {...restProps}
      />
    )
  }
}
