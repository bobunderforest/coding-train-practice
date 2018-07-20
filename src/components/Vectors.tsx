import * as React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

const Title = styled.div`
  margin: 60px 0;
  font-size: 18px;
  text-align: center;
`

export const Vectors = () => {
  return (
    <>
      <Helmet>
        <title>Vectors Practice</title>
      </Helmet>
      <Title>
        <div>Vectors Practice</div>
      </Title>
    </>
  )
}
