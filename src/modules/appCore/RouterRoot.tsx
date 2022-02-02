import { useRoutes } from 'react-router-dom'
import { routes } from 'modules/appCore/routerConfig'

export function RouterRoot() {
  const routesEl = useRoutes(routes)

  return <>{routesEl}</>
}
