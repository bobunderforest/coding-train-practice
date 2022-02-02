import { ComponentProps, useState } from 'react'
import Measure, { BoundingRect } from 'react-measure'
import { CanvasAnimFrame, RenderArgs } from './CanvasAnimFrame'

export type { RenderArgs } from './CanvasAnimFrame'

type CanvasProps = Omit<
  ComponentProps<typeof CanvasAnimFrame>,
  'width' | 'height'
>

type Props = CanvasProps & {
  render: (args: RenderArgs) => void
}

export function MeasuredCanvas({ className, ...canvasProps }: Props) {
  const [size, setSize] = useState<BoundingRect | undefined>()
  return (
    <Measure bounds onResize={({ bounds }) => setSize(bounds)}>
      {({ measureRef }) => (
        <div className={className} ref={measureRef}>
          {size && <CanvasAnimFrame {...size} {...canvasProps} />}
        </div>
      )}
    </Measure>
  )
}
