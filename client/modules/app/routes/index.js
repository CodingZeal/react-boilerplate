import React from 'react'
import { Route } from 'react-router'

import App from '../containers/App'
import { About } from 'modules/sample'

export default (
  <Route name='root' path='/' component={App}>
    <Route name='about' path='about-us' component={About} />
  </Route>
)
