import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { links } from 'modules/appCore/links'

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
  font-size: 28px;
`

const LinkWithText = (p: { text: string; link: string }) => (
  <DemoLink to={p.link}>{p.text}</DemoLink>
)

export const PageHome = () => (
  <Wrap>
    <h2>Hello!</h2>
    <p>
      Here I'm practicing in some math and physics programming while watching{' '}
      <a
        target="_blank"
        href="https://www.youtube.com/user/shiffman/videos"
        rel="noreferrer"
      >
        Coding Train Videos
      </a>
      <br />
      <br />
      Sources are{' '}
      <a
        target="_blank"
        href="https://github.com/manneredboor/coding-train-practice"
        rel="noreferrer"
      >
        here
      </a>
      <br />
      <br />
      You can check out the demos:
    </p>
    {Object.keys(links)
      .slice(1)
      .map((key, i) => (
        <LinkWithText key={i} {...(links as any)[key]} />
      ))}
    <br />
    <div style={{ textAlign: 'right', opacity: 0.5 }}>
      <a
        target="_blank"
        href="https://twitter.com/dmitrypodlesny"
        rel="noreferrer"
      >
        my twitter
      </a>
      &nbsp; &nbsp; &nbsp;
      <a
        target="_blank"
        href="https://www.instagram.com/under.forest/"
        rel="noreferrer"
      >
        my insta
      </a>
    </div>
  </Wrap>
)
