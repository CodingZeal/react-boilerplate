import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { FixNamedRoutesSupport as allowNames } from 'react-router-named-routes'

import routes from 'routes'

allowNames(routes)

const propTypes = {
  history: PropTypes.object.isRequired
}

export default function AppRouter({ history }) {
  return (
    <Router children={routes} history={history} />
  )
}

AppRouter.propTypes = propTypes
