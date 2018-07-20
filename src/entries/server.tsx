import * as React from 'react'
import Helmet from 'react-helmet'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'
import { ServerStyleSheet } from 'styled-components'
import { routes } from 'routes'
import { Html } from 'components/Layout/Html'
import createServerEntry from '@gnarlycode/react-app-tools/helpers/server-entry'

// Server Middleware
export default createServerEntry(async ({ scripts, res, req, next }) => {
  try {
    const sheet = new ServerStyleSheet()

    // Render App
    const markup = renderToString(
      sheet.collectStyles(
        <StaticRouter location={req.url} context={{}}>
          {renderRoutes(routes)}
        </StaticRouter>,
      ),
    )

    // Render Html
    const html = renderToStaticMarkup(
      <Html
        helmet={Helmet.renderStatic()}
        markup={markup}
        scripts={scripts}
        styleEl={sheet.getStyleElement()}
      />,
    )

    // Response
    res.send(`<!doctype html>${html}`)
  } catch (err) {
    next(err)
  }
})
