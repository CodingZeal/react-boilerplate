import React from 'react'
import { Router as ReactRouter } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { appRoutes as routes } from 'modules/app'

export default function Router({ store, history }) {
  return (
    <ReactRouter
        history={syncHistoryWithStore(history, store)}
        routes={routes} />
  )
}
