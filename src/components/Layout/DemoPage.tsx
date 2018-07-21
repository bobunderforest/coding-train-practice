import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { colors, dur } from 'utils/styles'
import * as links from 'utils/links'

import Arrow from 'svg/arrow.svg'

const plankStyle = css`
  position: fixed;
  padding: 0 10px;
  background-color: #fff;
  text-transform: uppercase;
  border: 5px solid #f9f4f8;
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

interface DemoPageProps {
  children: JSX.Element
  hint?: string | JSX.Element
  nextLink?: string
  nextText?: string
  srcLink?: string
}

export const DemoPage = ({
  children,
  hint,
  nextLink,
  nextText,
  srcLink,
}: DemoPageProps) => (
  <>
    <Back to={links.home}>
      <Arrow />
      <div>Home</div>
    </Back>
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
    {children}
  </>
)
