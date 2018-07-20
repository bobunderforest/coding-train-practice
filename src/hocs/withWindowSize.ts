import { compose, lifecycle, mapProps, withStateHandlers } from 'recompose'

export interface EnhancedWithWindowSize {
  winH: number
  winW: number
}

interface EnhancerProps extends EnhancedWithWindowSize {
  handleResize: () => void
}

export const withWindowSize = compose(
  withStateHandlers(
    ({ winH = 0, winW = 0 }: EnhancedWithWindowSize) => ({ winH, winW }),
    {
      handleResize: () => () => {
        let viewportHeight
        let viewportWidth
        if (document.compatMode === 'BackCompat') {
          viewportHeight = Math.min(
            document.body.clientHeight,
            window.innerHeight,
          )
          viewportWidth = document.body.clientWidth
        } else {
          viewportHeight = Math.min(
            document.documentElement.clientHeight,
            window.innerHeight,
          )
          viewportWidth = document.documentElement.clientWidth
        }
        return {
          winH: viewportHeight,
          winW: viewportWidth,
        }
      },
    },
  ),
  lifecycle<EnhancerProps, {}>({
    componentDidMount() {
      window.addEventListener('resize', this.props.handleResize)
      this.props.handleResize()
    },
    componentWillUnmount() {
      window.removeEventListener('resize', this.props.handleResize)
    },
  }),
  mapProps((props: EnhancerProps) => {
    const { handleResize, ...rest } = props
    return rest
  }),
)
