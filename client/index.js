import es6promise from 'es6-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import { Router, configureStore, history } from 'base'

es6promise.polyfill()

const store = configureStore()
const syncedHistory = syncHistoryWithStore(history, store)

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={syncedHistory} />
    </Provider>,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', renderApp)
