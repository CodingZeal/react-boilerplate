import React from 'react'
import { Router as ReactRouter, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import useNamedRoutes from 'use-named-routes'
import createHistory from 'history/lib/createBrowserHistory'

import { appRoutes as routes } from 'modules/app'

const history = useNamedRoutes(
  useRouterHistory(createHistory)
)({ routes })

export { history }

export default function Router({ store }) {
  return (
    <ReactRouter
        history={syncHistoryWithStore(history, store)}
        routes={routes} />
  )
}
