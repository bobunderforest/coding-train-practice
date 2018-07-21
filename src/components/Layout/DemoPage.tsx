import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { colors, dur } from 'utils/styles'
import * as links from 'utils/links'

import Arrow from 'svg/arrow.svg'

const buttonStyle = css`
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  height: 75px;
  background-color: #fff;
  border-radius: 2px;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  font-size: 16px;
  border: 5px solid #f9f4f8;

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
  left: 40px;
  bottom: 40px;
`

interface DemoPageProps {
  children: JSX.Element
  nextLink?: string
  nextText?: string
  srcLink?: string
}

export const DemoPage = ({
  children,
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
    {children}
  </>
)
