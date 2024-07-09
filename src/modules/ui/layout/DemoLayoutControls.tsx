import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { colors, dur } from 'modules/styles/styles'

import { links } from 'modules/appCore/links'

import Arrow from 'assets/arrow.svg?react'
import Restart from 'assets/restart.svg?react'

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

type Props = {
  next?: { link: string; text: string }
  hint?: React.ReactNode
  srcLink?: string
  onClickRestart?: React.MouseEventHandler<HTMLDivElement>
}

export function DemoLayoutControls({
  next,
  hint,
  srcLink,
  onClickRestart,
}: Props) {
  return (
    <>
      <Back to={links.home.link}>
        <Arrow />
        <div>Home</div>
      </Back>
      <RestartBtn onClick={onClickRestart}>
        <Restart />
      </RestartBtn>
      {next && (
        <Next to={next.link}>
          <div>{next.text}</div>
          <Arrow />
        </Next>
      )}
      {srcLink && (
        <Source
          href={
            'https://github.com/manneredboor/coding-train-practice/blob/main/src/modules/studyCases/' +
            srcLink
          }
          target="_blank"
        >
          <div>Source</div>
        </Source>
      )}
      {hint && <Hint>{hint}</Hint>}
    </>
  )
}
