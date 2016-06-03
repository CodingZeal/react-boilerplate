import React, { PropTypes } from 'react'
import { Router as ReactRouter } from 'react-router'
import { FixNamedRoutesSupport as allowNames } from 'react-router-named-routes'

import { appRoutes } from 'modules/app'

allowNames(appRoutes)

const propTypes = {
  history: PropTypes.object.isRequired
}

export default function Router({ history }) {
  return (
    <ReactRouter children={appRoutes} history={history} />
  )
}

Router.propTypes = propTypes
