import { RouteConfig } from 'react-router-config'
import { Home } from 'components/Home'
import { Vectors } from 'components/Vectors/Vectors'
import { AppContainer } from 'components/Layout/AppContainer'
import * as links from 'utils/links'

export const routes: RouteConfig[] = [
  {
    component: AppContainer,
    routes: [
      {
        component: Home,
        exact: true,
        path: links.home,
      },
      {
        component: Vectors,
        exact: true,
        path: links.vectors,
      },
    ],
  },
]
