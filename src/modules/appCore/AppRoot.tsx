import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { GlobalStyle } from '../styles/GlobalStyle'
import { RouterRoot } from 'modules/appCore/RouterRoot'
import { ScrollRestorator } from 'modules/appCore/ScrollRestorator'

import { BASE_URL } from 'config'

export function AppRoot() {
  return (
    <StrictMode>
      <GlobalStyle />
      <BrowserRouter basename={BASE_URL}>
        <ScrollRestorator />
        <RouterRoot />
      </BrowserRouter>
    </StrictMode>
  )
}
