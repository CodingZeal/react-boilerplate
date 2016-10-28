import es6promise from 'es6-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { useRouterHistory } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'

import { Router, configureStore } from 'base'

es6promise.polyfill()

const store = configureStore()
const history = useRouterHistory(createHistory)

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', renderApp)
