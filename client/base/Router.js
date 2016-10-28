import React, { PropTypes } from 'react'
import { Router as ReactRouter } from 'react-router'
import useNamedRoutes from 'use-named-routes'
import { syncHistoryWithStore } from 'react-router-redux'

import { appRoutes as routes } from 'modules/app'

const propTypes = {
  history: PropTypes.func.isRequired
}

export default function Router({ history, store }) {
  const namedHistory = syncHistoryWithStore(
    useNamedRoutes(history)({ routes }),
    store
  )

  return (
    <ReactRouter history={namedHistory} routes={routes} />
  )
}

Router.propTypes = propTypes
