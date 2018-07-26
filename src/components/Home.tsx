import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { links } from 'utils/links'

const Wrap = styled.div`
  margin: 80px auto;
  padding: 60px;
  max-width: 600px;
  background-color: #fff;
  border: 5px solid #f9f4f8;

  h2 {
    font-weight: bold;
    font-size: 42px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
  }
`

const DemoLink = styled(Link)`
  margin: 25px 0;
  display: block;
  width: fit-content;
  font-size: 32px;
`

const LinkWithText = (p: { text: string; link: string }) => (
  <DemoLink to={p.link}>{p.text}</DemoLink>
)

export const Home = () => (
  <Wrap>
    <h2>Hello!</h2>
    <p>
      Here I'm practicing in some math and physics programming while watching{' '}
      <a target="_blank" href="https://www.youtube.com/user/shiffman/videos">
        Coding Train Videos
      </a>.
      <br />
      <br />
      You can check out the demos:
    </p>
    {Object.keys(links)
      .slice(1)
      .map(key => <LinkWithText {...(links as any)[key]} />)}
  </Wrap>
)
