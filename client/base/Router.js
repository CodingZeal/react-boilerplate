import React, { PropTypes } from 'react'
import { Router as ReactRouter } from 'react-router'

import { appRoutes } from 'modules/app'

const propTypes = {
  history: PropTypes.object.isRequired
}

export default function Router({ history }) {
  return <ReactRouter history={history} routes={appRoutes} />
}

Router.propTypes = propTypes
