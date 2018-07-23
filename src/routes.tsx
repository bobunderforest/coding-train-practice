import { RouteConfig } from 'react-router-config'
import { Home } from 'components/Home'
import { Vectors } from 'components/Vectors/Vectors'
import { Forces } from 'components/Forces/Forces'
import { DragResistance } from 'components/Forces/DragResistance'
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
      {
        component: Forces,
        exact: true,
        path: links.forces,
      },
      {
        component: Forces,
        exact: true,
        path: links.forces,
      },
      {
        component: DragResistance,
        exact: true,
        path: links.dragResistance,
      },
    ],
  },
]
