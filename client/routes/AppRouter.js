import React from 'react'
import { Router } from 'react-router'
import { FixNamedRoutesSupport as allowNames } from 'react-router-named-routes'

import { history } from 'store'
import routes from 'routes'

allowNames(routes)

export default function AppRouter() {
  return (
    <Router children={routes} history={history} />
  )
}
