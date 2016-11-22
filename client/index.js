import es6promise from 'es6-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Router, configureStore, history } from 'base'

es6promise.polyfill()

const store = configureStore()

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <Router store={store} history={history} />
    </Provider>,
    document.getElementById('root')
  )
}

document.addEventListener('DOMContentLoaded', renderApp)
