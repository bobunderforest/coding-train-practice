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
      </a>
      <br />
      <br />
      Sources are{' '}
      <a
        target="_blank"
        href="https://github.com/manneredboor/coding-train-practice"
      >
        here
      </a>
      <br />
      <br />
      You can check out the demos:
    </p>
    {Object.keys(links)
      .slice(1)
      .map(key => <LinkWithText {...(links as any)[key]} />)}
    <br />
    <div style={{ textAlign: 'right', opacity: 0.5 }}>
      <a target="_blank" href="https://twitter.com/ManneredBoor">
        my twitter
      </a>
      &nbsp; &nbsp; &nbsp;
      <a target="_blank" href="https://www.instagram.com/bob.underforest/">
        my insta
      </a>
    </div>
  </Wrap>
)
