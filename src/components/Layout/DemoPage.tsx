import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { colors, dur } from 'utils/styles'
import {
  CanvasAnimFrameProps,
  RenderArgs,
} from 'components/Utils/CanvasAnimFrame'
import { FullScreenCanvas } from 'components/Utils/FullScreenCanvas'
import * as links from 'utils/links'

import Arrow from 'svg/arrow.svg'
import Restart from 'svg/restart.svg'

const plankStyle = css`
  position: fixed;
  padding: 0 10px;
  background-color: #fff;
  text-transform: uppercase;
  border: 5px solid #f9f4f8;
  user-select: none;
`

const buttonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  height: 75px;
  border-radius: 2px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  ${plankStyle};

  & svg {
    display: block;
    margin: 0 10px;
    width: 35px;
    height: 35px;
    fill: ${colors.brand};
    transition: ease fill ${dur.norm};
  }

  & div {
    margin: 0 10px;
  }

  &:hover {
    border-color: #f9f4f8;
    & svg {
      fill: ${colors.brandHover};
      transition-duration: ${dur.fast};
    }
  }
`

const Back = styled(Link)`
  ${buttonStyle};
  top: 40px;
  left: 40px;
`

const Next = styled(Link)`
  ${buttonStyle};
  right: 40px;
  top: 40px;

  & svg {
    transform: rotate(180deg);
  }
`

const Source = styled.a`
  ${buttonStyle};
  right: 40px;
  bottom: 40px;
`

const Hint = styled.div`
  ${plankStyle};
  padding: 20px;
  left: 40px;
  bottom: 40px;
  font-size: 16px;
  font-weight: bold;
  color: ${colors.brand};
`

const RestartBtn = styled.div`
  ${buttonStyle};
  top: 40px;
  left: 50%;
  margin-left: -42px;
`

export interface SetupArgs {
  height: number
  width: number
}

interface CanvasPropsArgs<S> {
  drawState: S
}

interface DemoPageProps<S> {
  canvasProps?: (args: CanvasPropsArgs<S>) => Partial<CanvasAnimFrameProps>
  hint?: string | JSX.Element
  nextLink?: string
  nextText?: string
  onRestart?: () => void
  render: (args: RenderArgs & { drawState: S }) => void
  setup?: (args: SetupArgs) => S
  srcLink?: string
}

interface DemoPageState<S> {
  drawState?: S
}

export class DemoPage<S extends {} = {}> extends React.PureComponent<
  DemoPageProps<S>,
  DemoPageState<S>
> {
  shouldSetup: boolean = true

  constructor(props: DemoPageProps<S>) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      canvasProps,
      hint,
      nextLink,
      nextText,
      render,
      setup,
      srcLink,
    } = this.props
    const { drawState } = this.state
    const cp = canvasProps && drawState ? canvasProps({ drawState }) : {}
    return (
      <>
        <Back to={links.home}>
          <Arrow />
          <div>Home</div>
        </Back>
        <RestartBtn onClick={() => (this.shouldSetup = true)}>
          <Restart />
        </RestartBtn>
        {nextLink && (
          <Next to={nextLink}>
            <div>{nextText}</div>
            <Arrow />
          </Next>
        )}
        {srcLink && (
          <Source href={srcLink} target="_blank">
            <div>Source</div>
          </Source>
        )}
        {hint && <Hint>{hint}</Hint>}
        <FullScreenCanvas
          {...cp}
          render={args => {
            const { width, height } = args
            if (this.shouldSetup) {
              this.setState({
                drawState: setup ? setup({ width, height }) : ({} as any),
              })
              this.shouldSetup = false
            }
            if (drawState) render({ ...args, drawState })
          }}
        />
      </>
    )
  }
}
