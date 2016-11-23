import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { Router, configureStore } from 'base'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} />
    </Provider>,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', renderApp)
