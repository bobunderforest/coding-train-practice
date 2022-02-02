import { RouteObject } from 'react-router-dom'

import { AppLayout } from 'modules/ui/layout/AppLayout'
import { PageHome } from 'modules/pages/PageHome'
import { Vectors } from 'modules/studyCases/01-Vectors/Vectors'
import { Forces } from 'modules/studyCases/02-Forces/Forces'
import { DragResistance } from 'modules/studyCases/02-Forces/DragResistance'
import { GravityAttraction } from 'modules/studyCases/02-Forces/GravityAttraction'
import { MutalAttraction } from 'modules/studyCases/02-Forces/MutalAttraction'
import { PortDefender } from 'modules/studyCases/03-PortDefender/PortDefender'
import { HarmonicMotion } from 'modules/studyCases/04-HarmonicMotion/HarmonicMotion'
import { Pendulum } from 'modules/studyCases/05-Pendulum/Pendulum'
import { Spring } from 'modules/studyCases/05-Pendulum/Spring'

import { links } from './links'

export const routes: RouteObject[] = [
  {
    path: links.home.link,
    element: <AppLayout />,
    children: [
      {
        element: <PageHome />,
        path: links.home.link,
        index: true,
      },
      {
        element: <Vectors />,
        path: links.vectors.link,
      },
      {
        element: <Forces />,
        path: links.forces.link,
      },
      {
        element: <DragResistance />,
        path: links.dragResistance.link,
      },
      {
        element: <GravityAttraction />,
        path: links.gravityAttraction.link,
      },
      {
        element: <MutalAttraction />,
        path: links.mutalAttraction.link,
      },
      {
        element: <PortDefender />,
        path: links.portDefender.link,
      },
      {
        element: <HarmonicMotion />,
        path: links.harmonicMotion.link,
      },
      {
        element: <Pendulum />,
        path: links.pendulum.link,
      },
      {
        element: <Spring />,
        path: links.spring.link,
      },
    ],
  },
]
