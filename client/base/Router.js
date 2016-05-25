import React, { PropTypes } from 'react'
import { Router as ReactRouter } from 'react-router'
import { FixNamedRoutesSupport as allowNames } from 'react-router-named-routes'

import routes from 'routes'

allowNames(routes)

const propTypes = {
  history: PropTypes.object.isRequired
}

export default function Router({ history }) {
  return (
    <ReactRouter children={routes} history={history} />
  )
}

Router.propTypes = propTypes
