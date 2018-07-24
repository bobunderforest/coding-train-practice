import { RouteConfig } from 'react-router-config'
import { Home } from 'components/Home'
import { Vectors } from 'components/Vectors/Vectors'
import { Forces } from 'components/Forces/Forces'
import { DragResistance } from 'components/Forces/DragResistance'
import { AppContainer } from 'components/Layout/AppContainer'
import { links } from 'utils/links'

export const routes: RouteConfig[] = [
  {
    component: AppContainer,
    routes: [
      {
        component: Home,
        exact: true,
        path: links.home.link,
      },
      {
        component: Vectors,
        exact: true,
        path: links.vectors.link,
      },
      {
        component: Forces,
        exact: true,
        path: links.forces.link,
      },
      {
        component: Forces,
        exact: true,
        path: links.forces.link,
      },
      {
        component: DragResistance,
        exact: true,
        path: links.dragResistance.link,
      },
    ],
  },
]
