import { hot } from 'react-hot-loader'
import { compose } from 'recompose'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'
import { routes } from 'routes'

export const ClientAppRoot = compose(
  hot(module),
  withRouter,
)(() => renderRoutes(routes))
