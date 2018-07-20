import { RouteConfig } from 'react-router-config'
import { Vectors } from 'components/Vectors'
import { AppContainer } from 'components/Layout/AppContainer'
import * as links from 'utils/links'

export const routes: RouteConfig[] = [
  {
    component: AppContainer,
    routes: [
      {
        component: Vectors,
        exact: true,
        path: links.vectors,
      },
    ],
  },
]
