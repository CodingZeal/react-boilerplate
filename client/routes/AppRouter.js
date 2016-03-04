import React from 'react'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { FixNamedRoutesSupport as allowNames } from 'react-router-named-routes'

import routes from 'routes'
import store from 'store'

allowNames(routes)

const history = syncHistoryWithStore(browserHistory, store)

export default function AppRouter() {
  return (
    <Router children={routes} history={history} />
  )
}
