import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const AppWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(#fcfde5, #f5ffef, #faf1fb, #ffe1f7);
`

export function AppLayout() {
  return (
    <AppWrap>
      <Outlet />
    </AppWrap>
  )
}
