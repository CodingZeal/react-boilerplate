import es6promise from 'es6-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import 'bootswatch/spacelab/bootstrap.css'

import AppRouter from 'routes/AppRouter'
import configureStore from 'store/configureStore'

es6promise.polyfill()

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

document.addEventListener('DOMContentLoaded', () =>
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter history={history} />
    </Provider>,
    document.getElementById('root')
  )
)
