import * as React from 'react'
import Measure from 'react-measure'
import {
  CanvasAnimFrame,
  CanvasAnimFrameProps,
  RenderArgs,
} from './CanvasAnimFrame'
export { RenderArgs } from './CanvasAnimFrame'

interface MeasuredCanvasProps extends Partial<CanvasAnimFrameProps> {
  render: (args: RenderArgs) => void
}

interface MeasuredCanvasState {
  size?: {
    height: number
    width: number
  }
}

export class MeasuredCanvas extends React.PureComponent<
  MeasuredCanvasProps,
  MeasuredCanvasState
> {
  constructor(props: MeasuredCanvasProps) {
    super(props)
    this.state = {}
  }

  render() {
    const { className, width, height, ...canvasProps } = this.props
    const { size } = this.state
    return (
      <Measure
        bounds
        onResize={({ bounds }) => this.setState({ size: bounds })}
      >
        {({ measureRef }) => (
          <div className={className} ref={measureRef}>
            {size && <CanvasAnimFrame {...size} {...canvasProps} />}
          </div>
        )}
      </Measure>
    )
  }
}
